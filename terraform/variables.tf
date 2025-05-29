# locals {
#     service_account = "serviceAccount:${google_service_account.service_account.email}"
# }

variable "project" {
    description = "Project id in the cloud"
}

variable "region" {
    description = "Region where the resources will be created"
}

variable "application_secret_name" {
    description = "Name of the secret manager for the solution"
}
