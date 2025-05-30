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

resource "google_compute_router" "cloud_router" {
  name    = "default-router"
  network = "default"
  region  = var.region 
  project = var.project
}

resource "google_compute_router_nat" "cloud_nat" {
  name                               = "default-nat"
  router                             = google_compute_router.cloud_router.name
  region                             = var.region
  project                            = var.project
  nat_ip_allocate_option             = "AUTO_ONLY"
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"

  log_config {
    enable = false
    filter = "ERRORS_ONLY"
  }
}
