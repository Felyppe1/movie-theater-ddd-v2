resource "google_pubsub_topic" "send_email" {
  name = "send-email"

  message_retention_duration = "604800s"
}