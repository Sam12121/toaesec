package cronjobs

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/Sam12121/toaetest/toae_server/handler"
	"github.com/Sam12121/toaetest/toae_utils/log"
	"github.com/hibiken/asynq"
)

var (
	listing_url = "https://threat-intel.toae.io/release/threatmapper/listing.json"
)

type ListingFormat struct {
	Available []struct {
		Built    time.Time `json:"built"`
		Version  string    `json:"version"`
		URL      string    `json:"url"`
		Checksum string    `json:"checksum"`
	} `json:"available"`
}

func CheckAgentUpgrade(ctx context.Context, task *asynq.Task) error {
	log.Info().Msg("Start agent version check")

	resp, err := http.Get(listing_url)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	var listing ListingFormat
	json.Unmarshal(body, &listing)

	versioned_tarball := map[string]*bytes.Buffer{}
	tags := []string{}
	for _, version := range listing.Available {
		tar_resp, err := http.Get(version.URL)
		if err != nil {
			log.Error().Msgf("Skipping %v, %v", version, err)
			continue
		}
		defer tar_resp.Body.Close()

		tags = append(tags, version.Version)

		tarball, err := io.ReadAll(tar_resp.Body)
		if err != nil {
			log.Error().Msgf("Skipping %v, err: %v", version, err)
			continue
		}

		versioned_tarball[version.Version] = bytes.NewBuffer(tarball)
	}

	tags_with_urls, err := handler.PrepareAgentBinariesReleases(ctx, versioned_tarball)
	if err != nil {
		return err
	}

	err = handler.IngestAgentVersion(ctx, tags_with_urls)
	if err != nil {
		return err
	}

	err = handler.CleanUpAgentVersion(ctx, tags)
	if err != nil {
		return err
	}

	return handler.ScheduleAutoUpgradeForPatchChanges(ctx, handler.GetLatestVersionByMajorMinor(versioned_tarball))
}
