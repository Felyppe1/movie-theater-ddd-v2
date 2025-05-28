import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import functions_framework
from dotenv import load_dotenv

load_dotenv()

SMTP_SERVER = os.environ.get("SMTP_SERVER")
SMTP_PORT = os.environ.get("SMTP_PORT")
EMAIL_SENDER = os.environ.get("EMAIL_SENDER")
EMAIL_PASSWORD = os.environ.get("EMAIL_PASSWORD")

for var_name, var_value in {
    "SMTP_SERVER": SMTP_SERVER,
    "SMTP_PORT": SMTP_PORT,
    "EMAIL_SENDER": EMAIL_SENDER,
    "EMAIL_PASSWORD": EMAIL_PASSWORD
}.items():
    if not var_value:
        raise ValueError(f"Environment variable '{var_name}' is not set.")
    
@functions_framework.http
def main(request):
    request_json = request.get_json(silent=True)
    
    to_email = request_json.get("to")
    subject = request_json.get("subject")
    body = request_json.get("body")

    if not to_email or not subject or not body:
        return "Missing 'to', 'subject' or 'body' in request", 400

    if isinstance(to_email, list):
        to_email = ", ".join(to_email)
    
    message = MIMEMultipart()
    message["From"] = EMAIL_SENDER
    message["To"] = to_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP_SSL(SMTP_SERVER, int(SMTP_PORT)) as server:
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, to_email, message.as_string())
        
        return f"Email sent to {to_email}", 200
    except Exception as e:
        return f"Failed to send email: {e}", 500
