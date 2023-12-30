packer {
  required_plugins {
    docker = {
      version = ">= 0.0.7"
      source  = "github.com/hashicorp/docker"
    }
  }
}

source "docker" "nginx" {
  image  = "debian:latest"
  commit = true
  changes = [
    "ENTRYPOINT nginx -g 'daemon off;'"
  ]
}

build {
  sources = [
    "source.docker.nginx",
  ]

  provisioner "shell" {
    inline = [
      "apt update && apt install -y nginx",
    ]
  }

  post-processor "docker-tag" {
    repository = "${var.image_name}"
    tags       = ["${var.image_tag}"]
  }

  post-processor "shell-local" {
    inline = [
      "docker pull toaeio/toae_package_scanner_ce:v2",
      "docker run -i --rm --net=host --privileged=true -v /var/run/docker.sock:/var/run/docker.sock:rw toaeio/toae_package_scanner_ce:v2 -source ${var.image_name}:${var.image_tag} -console-url=${var.TOAE_CONSOLE_URL} -toae-key=${var.TOAE_KEY} -fail-on-count=${var.FAIL_CVE_COUNT} -fail-on-score=${var.FAIL_CVE_SCORE} -fail-on-critical-count ${var.FAIL_CRITICAL_CVE_COUNT} -scan-type=\"base,java,python,ruby,php,nodejs,js,dotnet\""
    ]
  }
}
