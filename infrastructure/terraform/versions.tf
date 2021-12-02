# Define required providers
terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.44.0"
    }

    tls = {
      source  = "hashicorp/tls"
      version = "3.1.0"
    }
  }

}
