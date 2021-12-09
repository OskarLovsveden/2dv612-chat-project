# variable "cloud_init_master" {}

variable "user_name" {
  type        = string
  description = ""
}

variable "tenant_name" {
  type        = string
  description = ""
}

variable "tenant_id" {
  type        = string
  description = ""
}

variable "password" {
  type        = string
  description = ""
}

variable "external_gateway" {
  type        = string
  description = "."
}

variable "region" {
  type        = string
  description = "."
}

variable "key_pair" {
  type        = string
  description = ""
}

variable "auth_url" {
  type = string
}

variable "key_name" {
  type        = string
  description = ""
}

variable "key_path" {
  type        = string
  description = ""
}

variable "server_create_timeout" {
  type        = string
  description = ""
}

variable "server_delete_timeout" {
  type        = string
  description = ""
}

variable "k8_port" {
  type        = number
  description = ""
}
