data "archive_file" "mts_publish_outbox_zip" {
    type = "zip"
    source_dir = "${path.module}/../cloud-functions/movie-theater-settings-publish-outbox"
    output_path = "${path.module}/../cloud-functions/build/movie-theater-settings-publish-outbox.zip"
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
        timeout_seconds = 540
        service_account_email = google_service_account.service_account.email
        environment_variables = {
            PROJECT_ID = var.project
            REGION = var.region
            APPLICATION_SECRET_NAME = var.application_secret_name
        }
        vpc_connector = google_vpc_access_connector.vpc_connector.name
        vpc_connector_egress_settings = "ALL_TRAFFIC"
    }

    depends_on = [
        google_project_service.required_apis["cloudfunctions.googleapis.com"],
        google_storage_bucket_object.mts_publish_outbox_object,
        google_vpc_access_connector.vpc_connector
    ]
}







data "archive_file" "send_email_zip" {
    type = "zip"
    source_dir = "${path.module}/../cloud-functions/send-email"
    output_path = "${path.module}/../cloud-functions/build/send-email.zip"
}

resource "google_storage_bucket_object" "send_email_object" {
    source = data.archive_file.send_email_zip.output_path
    content_type = "application/zip"
    name = "publish-${data.archive_file.send_email_zip.output_md5}.zip"
    bucket = google_storage_bucket.cloud_functions_bucket.name
    depends_on = [
        google_storage_bucket.cloud_functions_bucket,
        data.archive_file.send_email_zip
    ]
}

resource "google_cloudfunctions2_function" "send_email_function" {
    name = "send-email"
    location = var.region
    project = var.project
    description = "Cloud function created through terraform to send emails"

    build_config {
        runtime = "python312"
        entry_point = "main"

        source {
            storage_source {
                bucket = google_storage_bucket.cloud_functions_bucket.name
                object = google_storage_bucket_object.send_email_object.name
            }
        }
    }

    service_config {
        max_instance_count = 1
        available_memory = "256M"
        timeout_seconds = 400
        service_account_email = google_service_account.service_account.email
        environment_variables = {
            PROJECT_ID = var.project
            APPLICATION_SECRET_NAME = var.application_secret_name
            REGION = var.region
        }
    }

    event_trigger {
        trigger_region = var.region
        event_type     = "google.cloud.pubsub.topic.v1.messagePublished"
        pubsub_topic   = google_pubsub_topic.send_email.id
        retry_policy   = "RETRY_POLICY_RETRY"
    }

    depends_on = [
        google_project_service.required_apis["cloudfunctions.googleapis.com"],
        google_project_service.required_apis["pubsub.googleapis.com"],
        google_storage_bucket_object.send_email_object
    ]
}