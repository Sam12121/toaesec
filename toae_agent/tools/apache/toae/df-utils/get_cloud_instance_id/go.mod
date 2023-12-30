module github.com/Sam12121/toaetest/toae_agent/tools/apache/toae/df-utils/get_cloud_instance_id

go 1.20

replace github.com/Sam12121/df-utils => ../../df-utils/

replace github.com/Sam12121/df-utils/cloud_metadata => ../cloud_metadata

require github.com/Sam12121/df-utils/cloud_metadata v0.0.0-00010101000000-000000000000

replace github.com/Sam12121/toaetest/toae_utils => ../../../../../../toae_utils

require (
	github.com/Sam12121/toaetest/toae_utils v0.0.0-00010101000000-000000000000 // indirect
	github.com/Sam12121/df-utils v0.0.0-00010101000000-000000000000 // indirect
	github.com/mattn/go-colorable v0.1.12 // indirect
	github.com/mattn/go-isatty v0.0.14 // indirect
	github.com/rs/zerolog v1.30.0 // indirect
	golang.org/x/sys v0.12.0 // indirect
)
