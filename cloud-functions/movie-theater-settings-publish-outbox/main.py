import os
import json
from google.cloud import pubsub_v1
from sqlalchemy import create_engine, text
import functions_framework
from dotenv import load_dotenv

load_dotenv()

PROJECT_ID = os.getenv('PROJECT_ID')
print(PROJECT_ID)
if not PROJECT_ID:
    raise ValueError("PROJECT_ID environment variable is not set.")
# PUBSUB_TOPIC_NAME = os.getenv('PUBSUB_TOPIC_NAME')
# if not PUBSUB_TOPIC_NAME:
#     raise ValueError("PUBSUB_TOPIC_NAME environment variable is not set.")
DB_URL = os.getenv('DB_URL')
if not DB_URL:
    raise ValueError("DB_URL environment variable is not set.")

BATCH_SIZE = 30

publisher = pubsub_v1.PublisherClient()
engine = create_engine(DB_URL)

def publish_message(topic_name, payload):
    topic_path = publisher.topic_path(PROJECT_ID, topic_name)

    message_bytes = json.dumps(payload).encode("utf-8")

    publisher.publish(topic_path, message_bytes)

def process_outbox():
    with engine.connect() as conn:
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
                publish_message(event_name, json.loads(payload))

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
    process_outbox()

    return 'Processed outbox events'
