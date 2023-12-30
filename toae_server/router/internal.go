package router

import (
	"github.com/Sam12121/toaetest/toae_server/handler"
	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
	"github.com/twmb/franz-go/pkg/kgo"
)

func InternalRoutes(r *chi.Mux, ingestC chan *kgo.Record) error {
	// authorization
	authEnforcer, err := newAuthorizationHandler()
	if err != nil {
		return err
	}

	dfHandler := &handler.Handler{
		AuthEnforcer:   authEnforcer,
		SaasDeployment: IsSaasDeployment(),
		Validator:      validator.New(),
		IngestChan:     ingestC,
	}

	r.Route("/toae/internal", func(r chi.Router) {
		r.Group(func(r chi.Router) {
			r.Route("/console-api-token", func(r chi.Router) {
				r.Get("/", dfHandler.GetAPITokenForConsoleAgent)
			})
		})
	})

	return nil
}
