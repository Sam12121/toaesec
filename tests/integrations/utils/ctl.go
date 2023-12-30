package utils

import (
	"encoding/json"
	"log"
	"os"
	"os/exec"
	"sync/atomic"
	"time"
)

var (
	toae_ctl_path string
	toae_api_key  string
	run_once           atomic.Bool
)

func init() {
	if os.Getenv("TOAE_URL") == "" {
		log.Fatal("TOAE_URL missing")
	}
	toae_ctl_path = os.Getenv("DF_TOAE_CTL_PATH")
	toae_api_key = os.Getenv("TOAE_APIKEY")
}

func auth() error {
	if run_once.Load() {
		return nil
	}
	cmd := exec.Command(toae_ctl_path+"/toaectl", []string{"auth", "--api-token=" + toae_api_key}...)
	cmd.Env = os.Environ()
	_, err := cmd.Output()
	run_once.Store(true)
	return err
}

func RunToaeCtl(args []string) (map[string]interface{}, time.Duration, error) {
	output := map[string]interface{}{}
	var dur time.Duration
	if err := auth(); err != nil {
		return output, dur, err
	}
	start := time.Now()
	cmd := exec.Command(toae_ctl_path+"/toaectl", args...)
	cmd.Env = os.Environ()
	b, err := cmd.Output()
	dur = time.Since(start)
	if err != nil {
		return output, dur, err
	}
	err = json.Unmarshal(b, &output)
	if err != nil {
		anonymous_nodes := []map[string]interface{}{}
		err = json.Unmarshal(b, &anonymous_nodes)
		if err == nil {
			output[""] = anonymous_nodes
		}
	}
	return output, dur, err
}
