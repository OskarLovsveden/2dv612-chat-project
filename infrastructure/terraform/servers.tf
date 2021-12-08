
# Create master server
resource "openstack_compute_instance_v2" "kube-master-server" {
  depends_on = [
    openstack_networking_router_interface_v2.router_interface
  ]


  name         = "kube-master-server"
  image_id     = "ca4bec1a-ac25-434f-b14c-ad8078ccf39f"
  flavor_name  = "c2-r4-d20"
  key_pair     = var.key_pair
  force_delete = true
  security_groups = [
    "default",
    "${openstack_networking_secgroup_v2.ssh_secgroup.name}"
  ]
  availability_zone = "Education"

  network {
    name = openstack_networking_network_v2.network.name
  }

  tags = ["master"]

  timeouts {
    create = var.server_create_timeout
    delete = var.server_delete_timeout
  }
}

# Create node servers
resource "openstack_compute_instance_v2" "kube-node-server" {
  depends_on = [
    openstack_networking_router_interface_v2.router_interface
  ]

  name         = "kube-node-server-${count.index}"
  image_id     = "ca4bec1a-ac25-434f-b14c-ad8078ccf39f"
  flavor_name  = "c1-r1-d10"
  key_pair     = var.key_pair
  force_delete = true
  security_groups = [
    "default",
    openstack_networking_secgroup_v2.ssh_secgroup.name,
    openstack_networking_secgroup_v2.proxy_secgroup.name

  ]
  availability_zone = "Education"

  network {
    name = openstack_networking_network_v2.network.name
  }

  tags = ["nodes"]

  count = 3

  timeouts {
    create = var.server_create_timeout
    delete = var.server_delete_timeout
  }
}
