package main

import (
	"log"
	"net/rpc"

	"github.com/Sam12121/toaetest/toae_bootstrapper/server"
)

func main() {
	client, err := rpc.Dial("unix", "/tmp/tmp/toae_boot.sock")
	if err != nil {
		log.Fatal("dialing:", err)
	}
	reply := server.Reply{}
	args := server.UpgradeArgs{Name: "package_scanner", URL: "http://143.110.232.114:8089/package-scanner"}
	err = client.Call("Server.Upgrade", &args, &reply)
	if err != nil {
		log.Fatal(err)
	}
}
