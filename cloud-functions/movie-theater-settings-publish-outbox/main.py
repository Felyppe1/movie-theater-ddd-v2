import os
import json
from google.cloud import pubsub_v1
from google.cloud import secretmanager
from sqlalchemy import create_engine, text
from sqlalchemy.pool import NullPool
import functions_framework
from dotenv import load_dotenv
from google.cloud.sql.connector import Connector, IPTypes

load_dotenv()

PROJECT_ID = os.getenv('PROJECT_ID')
REGION = os.getenv('REGION')
APPLICATION_SECRET_NAME = os.getenv('APPLICATION_SECRET_NAME')

for var_name, var_value in {
    "PROJECT_ID": PROJECT_ID,
    "REGION": REGION,
    "APPLICATION_SECRET_NAME": APPLICATION_SECRET_NAME,
}.items():
    if not var_value:
        raise ValueError(f"Environment variable '{var_name}' is not set.")
    
DB_URL = None
EMAIL_PASSWORD = None

_publisher = None
_engine = None
connector = Connector()

def test():
    try:
        engine = get_engine()

        with engine.connect() as conn:
            result = conn.execute(text("SELECT current_database(), inet_server_addr();"))
            for row in result:
                print(f"Connected to DB: {row}")

        return "DB Connection Success!", 200
    except Exception as e:
        print(f"Error: {e}")
        return f"Error: {e}", 500

def get_publisher():
    global _publisher
    if _publisher is None:
        _publisher = pubsub_v1.PublisherClient()
    return _publisher

def get_engine():
    global _engine
    if _engine is None:
        def getconn():
            conn = connector.connect(
                f"{PROJECT_ID}:{REGION}:movie-theater-db",
                "pg8000",
                user="postgres",
                password=EMAIL_PASSWORD,
                db="movie_theater",
                ip_type=IPTypes.PRIVATE  # ou IPTypes.PRIVATE se quiser usar IP privado
            )
            return conn

        _engine = create_engine(
            "postgresql+pg8000://",
            creator=getconn,
            poolclass=NullPool
        )

    return _engine

def get_secret_manager_secret():
    global DB_URL
    global EMAIL_PASSWORD

    print('Getting secret manager secret')
    
    secretManagerClient = secretmanager.SecretManagerServiceClient()

    request = { "name": f"projects/{PROJECT_ID}/secrets/{APPLICATION_SECRET_NAME}/versions/latest" }
    response = secretManagerClient.access_secret_version(request)

    credentials = json.loads(response.payload.data.decode('UTF-8'))

    DB_URL = credentials.get('db_url')
    EMAIL_PASSWORD = credentials.get('email_password')

def publish_message(topic_name, payload):
    publisher = get_publisher()

    topic_path = publisher.topic_path(PROJECT_ID, topic_name)

    message_bytes = json.dumps(payload).encode("utf-8")

    publisher.publish(topic_path, message_bytes)

def process_outbox():
    print('Processing outbox events')

    BATCH_SIZE = 30

    engine = get_engine()

    with engine.begin() as conn:
        conn.execute(text('SET search_path TO movie_theater_settings'))

        result = conn.execute(text(f"""
            SELECT id, event_name, payload
            FROM outbox
            WHERE status != 'published'
            ORDER BY created_at
            LIMIT {BATCH_SIZE}
        """))

        events = result.fetchall()

        for event in events:
            event_id, event_name, payload = event
            try:
                publish_message(event_name, payload)

                conn.execute(text("""
                    UPDATE outbox
                    SET status = 'published'
                    WHERE id = :id
                """), {'id': event_id})

                print(f"Event {event_id} ({event_name}) published successfully.")
            except Exception as e:
                print(f"Failed to publish event {event_id}: {e}")

                conn.execute(text("""
                    UPDATE outbox
                    SET status = 'failed'
                    WHERE id = :id
                """), {'id': event_id})

@functions_framework.http
def main(request):
    get_secret_manager_secret()
    
    test()
    
    process_outbox()

    return 'Processed outbox events'
