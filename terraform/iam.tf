resource "google_service_account" "service_account" {
    project = var.project
    account_id = "application-service-account"
    display_name = "Service Account for Application"

    depends_on = [
        google_project_service.required_apis["iam.googleapis.com"]
    ]
}

resource "google_project_iam_member" "sa_roles_runner" {
    for_each = toset([
        "roles/cloudfunctions.invoker",
        "roles/run.invoker",
        "roles/workflows.invoker",
        "roles/logging.logWriter",
        "roles/secretmanager.secretAccessor"
    ])

    role = each.value
    member = "serviceAccount:${google_service_account.service_account.email}"
    project = var.project
}