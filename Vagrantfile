Vagrant.configure("2") do |config|
  config.vm.define vm_name = "dev-env"
  config.vm.provider :docker do |d|
     d.build_dir = "."
     d.remains_running = true
     d.has_ssh = true
  end

  config.vm.synced_folder ".", "/home/vagrant/project_files"

  config.vm.provision "shell", inline: $install_tools

  config.vm.network :forwarded_port, guest: 5001, host: 5001 # Open port to access server
end

$install_tools = <<SCRIPT
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform
sudo apt-get install software-properties-common -y
sudo apt-add-repository ppa:ansible/ansible
sudo apt-get update
sudo apt-get install ansible -y
sudo apt install nodejs npm -y
SCRIPT
