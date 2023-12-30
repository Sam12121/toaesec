package ingesters

import (
	"context"
	"encoding/json"

	"github.com/Sam12121/toaetest/toae_utils/directory"
	"github.com/Sam12121/toaetest/toae_utils/log"
	"github.com/Sam12121/toaetest/toae_utils/utils"
	ingestersUtil "github.com/Sam12121/toaetest/toae_utils/utils/ingesters"
	"github.com/twmb/franz-go/pkg/kgo"
)

type ComplianceIngester struct{}

func NewComplianceIngester() KafkaIngester[[]ingestersUtil.Compliance] {
	return &ComplianceIngester{}
}

func (tc *ComplianceIngester) Ingest(
	ctx context.Context,
	cs []ingestersUtil.Compliance,
	ingestC chan *kgo.Record,
) error {
	tenantID, err := directory.ExtractNamespace(ctx)
	if err != nil {
		return err
	}

	rh := []kgo.RecordHeader{
		{Key: "namespace", Value: []byte(tenantID)},
	}

	for _, c := range cs {
		cb, err := json.Marshal(c)
		if err != nil {
			log.Error().Msg(err.Error())
		} else {
			ingestC <- &kgo.Record{
				Topic:   utils.ComplianceScan,
				Value:   cb,
				Headers: rh,
			}
		}
	}

	return nil
}

type ComplianceScanStatusIngester struct{}

func NewComplianceScanStatusIngester() KafkaIngester[[]ingestersUtil.ComplianceScanStatus] {
	return &ComplianceScanStatusIngester{}
}

func (tc *ComplianceScanStatusIngester) Ingest(
	ctx context.Context,
	cs []ingestersUtil.ComplianceScanStatus,
	ingestC chan *kgo.Record,
) error {
	tenantID, err := directory.ExtractNamespace(ctx)
	if err != nil {
		return err
	}

	rh := []kgo.RecordHeader{
		{Key: "namespace", Value: []byte(tenantID)},
	}

	for _, c := range cs {
		cb, err := json.Marshal(c)
		if err != nil {
			log.Error().Msg(err.Error())
		} else {
			ingestC <- &kgo.Record{
				Topic:   utils.ComplianceScanStatus,
				Value:   cb,
				Headers: rh,
			}
		}
	}

	return nil
}
