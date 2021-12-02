# Configure the OpenStack Provider
provider "openstack" {
  user_name   = var.user_name
  tenant_name = var.tenant_name
  tenant_id   = var.tenant_id
  password    = var.password
  auth_url    = var.auth_url
  region      = var.region
}

provider "tls" {}
