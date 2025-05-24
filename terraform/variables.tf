# locals {
#     service_account = "serviceAccount:${google_service_account.service_account.email}"
# }

variable "project" {
    description = "Project id in the cloud"
}

variable "region" {
    description = "Region where the resources will be created"
}

variable "application_secret_manager_name" {
    description = "Name of the secret manager used in the cloud function extract"
}

variable "db_url_movie_theater_settings" {
    description = "Database URL for the movie theater settings bounded context"
}
