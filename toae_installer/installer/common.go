package installer

import "github.com/Sam12121/toae_installer/agent"

type Installer interface {
	Delete() error
	Install() error
	SaveNewConfig(agent.AgentImage) error
	RollBackConfig()
}
