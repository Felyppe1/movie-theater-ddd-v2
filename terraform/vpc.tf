resource "google_vpc_access_connector" "vpc_connector" {
  name          = "vpc-connector"
  region        = var.region
  network       = "default"
  ip_cidr_range = "10.8.0.0/28"
  min_instances = 2
  max_instances = 3

  depends_on = [
    google_project_service.required_apis["vpcaccess.googleapis.com"]
  ]
}