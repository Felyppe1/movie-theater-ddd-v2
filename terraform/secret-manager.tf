resource "google_secret_manager_secret" "movie_theater" {
    secret_id = "movie-theater"
    replication {
        auto {}
    }

    depends_on = [
        google_project_service.required_apis["secretmanager.googleapis.com"]
    ]
}