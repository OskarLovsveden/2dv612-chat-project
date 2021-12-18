# Define required providers
terraform {
  required_version = ">= 0.14.0"

  backend "http" {
  }

  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.44.0"
    }
  }
}

provider "openstack" {
  cloud = "openstack"
}
