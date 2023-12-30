package apiDocs //nolint:stylecheck

import (
	"net/http"

	"github.com/Sam12121/toaetest/toae_server/model"
)

func (d *OpenAPIDocs) AddInternalAuthOperations() {
	d.AddOperation("getConsoleApiToken", http.MethodGet, "/toae/internal/console-api-token",
		"Get api-token for console agent", "Get api-token for console agent",
		http.StatusOK, []string{tagInternal}, nil, nil, new(model.APIAuthRequest))
}
