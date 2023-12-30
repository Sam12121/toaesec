package cmd

import (
	"log"
	"os"

	"github.com/Sam12121/toaetest/toae_ctl/http"
	"github.com/spf13/cobra"
)

var (
	console_ip string
)

var (
	rootCmd = &cobra.Command{
		Use:   "toaectl",
		Short: "A toae controller CLI",
		Long:  `A simple CLI alternative to toae UI`,
	}
)

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	console_ip = os.Getenv("TOAE_URL")
	if console_ip == "" {
		log.Fatal("TOAE_URL not specified. Please provie Console IP.")
	}
	http.InjectConsoleIp(console_ip)
}
