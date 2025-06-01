import os
import smtplib
import base64
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import functions_framework
from dotenv import load_dotenv
from google.cloud import secretmanager

load_dotenv()

PROJECT_ID = os.environ.get("PROJECT_ID")
APPLICATION_SECRET_NAME = os.environ.get("APPLICATION_SECRET_NAME")

for var_name, var_value in {
    "PROJECT_ID": PROJECT_ID,
    "APPLICATION_SECRET_NAME": APPLICATION_SECRET_NAME,
}.items():
    if not var_value:
        raise ValueError(f"Environment variable '{var_name}' is not set.")

SMTP_SERVER = None
SMTP_PORT = None
EMAIL_SENDER = None
EMAIL_PASSWORD = None

def get_secret_manager_secret():
    global SMTP_SERVER
    global SMTP_PORT
    global EMAIL_SENDER
    global EMAIL_PASSWORD

    print('Getting secret manager secret')
    
    secretManagerClient = secretmanager.SecretManagerServiceClient()

    request = { "name": f"projects/{PROJECT_ID}/secrets/{APPLICATION_SECRET_NAME}/versions/latest" }
    response = secretManagerClient.access_secret_version(request)

    credentials = json.loads(response.payload.data.decode('UTF-8'))

    SMTP_SERVER = credentials.get('smtp_server')
    SMTP_PORT = credentials.get('smtp_port')
    EMAIL_SENDER = credentials.get('email_sender')
    EMAIL_PASSWORD = credentials.get('email_password')

@functions_framework.cloud_event
def main(cloud_event):
    get_secret_manager_secret()

    print('Sending emails')

    try:
        pubsub_message = base64.b64decode(cloud_event.data["message"]["data"]).decode("utf-8")
        request_json = json.loads(pubsub_message)
        
        to_email = request_json.get("to")
        subject = request_json.get("subject")
        body = request_json.get("body")

        if not to_email or not subject or not body:
            raise ValueError("Missing 'to', 'subject' or 'body' in message")

        if isinstance(to_email, list):
            to_email = ", ".join(to_email)

        message = MIMEMultipart()
        message["From"] = EMAIL_SENDER
        message["To"] = to_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "plain"))

        with smtplib.SMTP_SSL(SMTP_SERVER, int(SMTP_PORT)) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, to_email, message.as_string())

        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise