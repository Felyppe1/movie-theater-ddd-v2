resource "google_pubsub_topic" "send_email" {
  name = "send-email"

  message_retention_duration = "604800s"

  depends_on = [
    google_project_service.required_apis["pubsub.googleapis.com"],
    google_project_service.required_apis["eventarc.googleapis.com"],
  ]
}