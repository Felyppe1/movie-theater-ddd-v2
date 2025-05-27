resource "google_cloud_scheduler_job" "movie_theater_settings_publish_outbox_events" {
  name             = "movie-theater-settings-publish-outbox-events"
  description      = "Scheduler to trigger a cloud function to publish events from the outbox table for movie theater settings bounded context"
  schedule         = "* * * * *"
  time_zone        = "America/Sao_Paulo"
#   attempt_deadline = "10s"
  project          = var.project

  http_target {
    uri         = "https://${var.region}-${var.project}.cloudfunctions.net/${google_cloudfunctions2_function.mts_publish_outbox_function.name}"
    http_method = "GET"

    oidc_token {
      service_account_email = google_service_account.service_account.email
    }
  }
}