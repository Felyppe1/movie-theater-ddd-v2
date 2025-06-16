resource "google_cloud_tasks_queue" "send-email" {
    name = "send-email"
    location = var.region

    rate_limits {
        max_dispatches_per_second = 500
        max_concurrent_dispatches = 1000
    }

    retry_config {
        max_attempts         = 100
        max_doublings        = 16
        min_backoff  = "0.1s"
        max_backoff  = "3600s"
        max_retry_duration   = "0s" // "0s" indica duração ilimitada na interface, mas Terraform precisa de uma string de duração.
    }
}