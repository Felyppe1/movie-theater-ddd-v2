data "archive_file" "mts_publish_outbox_zip" {
    type = "zip"
    source_dir = "${path.module}/../cloud-functions/movie-theater-settings-publish-outbox"
    output_path = "${path.module}/deploy/movie-theater-settings-publish-outbox.zip"
}

resource "google_storage_bucket_object" "mts_publish_outbox_object" {
    source = data.archive_file.mts_publish_outbox_zip.output_path
    content_type = "application/zip"
    name = "publish-${data.archive_file.mts_publish_outbox_zip.output_md5}.zip"
    bucket = google_storage_bucket.cloud_functions_bucket.name
    depends_on = [
        google_storage_bucket.cloud_functions_bucket,
        data.archive_file.mts_publish_outbox_zip
    ]
}

resource "google_cloudfunctions2_function" "mts_publish_outbox_function" {
    name = "mts-publish-outbox"
    location = var.region
    project = var.project
    description = "Cloud function created through terraform to publish outbox events from the bounded context movie theater settings"

    build_config {
        runtime = "python312"
        entry_point = "main"

        source {
            storage_source {
                bucket = google_storage_bucket.cloud_functions_bucket.name
                object = google_storage_bucket_object.mts_publish_outbox_object.name
            }
        }
    }

    service_config {
        max_instance_count = 1
        available_memory = "256M"
        timeout_seconds = 400
        # service_account_email = google_service_account.service_account.email
        environment_variables = {
            PROJECT_ID = "${var.project}"
            DB_URL = "${var.db_url_movie_theater_settings}"
        }
    }

    depends_on = [
        google_project_service.required_apis["cloudfunctions.googleapis.com"]
    ]
}