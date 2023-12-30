PWD=$(shell pwd)

export ROOT_MAKEFILE_DIR=$(shell pwd)
export TOAE_AGENT_DIR=$(PWD)/toae_agent
export TOAE_ROUTER_DIR=$(PWD)/haproxy
export TOAE_FILE_SERVER_DIR=$(PWD)/toae_file_server
export TOAE_FRONTEND_DIR=$(PWD)/toae_frontend
export SECRET_SCANNER_DIR=$(TOAE_AGENT_DIR)/plugins/SecretScanner
export MALWARE_SCANNER_DIR=$(TOAE_AGENT_DIR)/plugins/YaraHunter/
export PACKAGE_SCANNER_DIR=$(TOAE_AGENT_DIR)/plugins/package-scanner
export COMPLIANCE_SCANNER_DIR=$(TOAE_AGENT_DIR)/plugins/compliance
export TOAE_CTL=$(PWD)/toae_ctl
export TOAED=$(PWD)/toae_bootstrapper
export IMAGE_REPOSITORY?=toaeio
export DF_IMG_TAG?=latest
export IS_DEV_BUILD?=false
export VERSION?="2.1.0"

default: bootstrap console_plugins agent console

.PHONY: console
console: redis postgres kafka-broker router server worker ui file-server graphdb jaeger

.PHONY: console_plugins
console_plugins: secretscanner malwarescanner packagescanner compliancescanner

.PHONY: bootstrap
bootstrap:
	./bootstrap.sh

.PHONY: alpine_builder
alpine_builder:
	docker build --tag=$(IMAGE_REPOSITORY)/toae_builder_ce:$(DF_IMG_TAG) -f docker_builders/Dockerfile-alpine .

.PHONY: go1_20_builder
go1_20_builder:
	docker build --tag=$(IMAGE_REPOSITORY)/toae_go_builder_ce:$(DF_IMG_TAG) -f docker_builders/Dockerfile-debianfluent-bit .

.PHONY: debian_builder
debian_builder:
	docker build --build-arg DF_IMG_TAG=${DF_IMG_TAG} --build-arg IMAGE_REPOSITORY=${IMAGE_REPOSITORY} --tag=$(IMAGE_REPOSITORY)/toae_glibc_builder_ce:$(DF_IMG_TAG) -f docker_builders/Dockerfile-debian .

.PHONY: bootstrap-agent-plugins
bootstrap-agent-plugins:
	(cd $(TOAE_AGENT_DIR)/plugins && make localinit)
	(cd $(PACKAGE_SCANNER_DIR) && bash bootstrap.sh)
	(cd $(SECRET_SCANNER_DIR) && bash bootstrap.sh)
	(cd $(MALWARE_SCANNER_DIR) && bash bootstrap.sh)

.PHONY: agent
agent: go1_20_builder debian_builder toaed console_plugins
	(cd $(TOAE_AGENT_DIR) &&\
	IMAGE_REPOSITORY="$(IMAGE_REPOSITORY)" DF_IMG_TAG="$(DF_IMG_TAG)" VERSION="$(VERSION)" bash build.sh)

.PHONY: toaed
toaed: alpine_builder bootstrap bootstrap-agent-plugins
	(cd $(TOAED) && make prepare)
	cp $(TOAED)/toae_bootstrapper $(TOAE_AGENT_DIR)/toaed

.PHONY: redis
redis:
	(cd toae_redis && docker build --tag=$(IMAGE_REPOSITORY)/toae_redis_ce:$(DF_IMG_TAG) .)

.PHONY: postgres
postgres:
	docker build --tag=$(IMAGE_REPOSITORY)/toae_postgres_ce:$(DF_IMG_TAG) -f toae_postgres/Dockerfile ./toae_postgres

.PHONY: kafka-broker
kafka-broker:
	docker build -t $(IMAGE_REPOSITORY)/toae_kafka_broker_ce:$(DF_IMG_TAG) -f ./toae_kafka/kafka-broker-Dockerfile ./toae_kafka

.PHONY: router
router:
	docker build --build-arg is_dev_build=$(IS_DEV_BUILD) -t $(IMAGE_REPOSITORY)/toae_router_ce:$(DF_IMG_TAG) $(TOAE_ROUTER_DIR)

.PHONY: file-server
file-server:
	docker build -t $(IMAGE_REPOSITORY)/toae_file_server_ce:$(DF_IMG_TAG) $(TOAE_FILE_SERVER_DIR)

.PHONY: server
server: alpine_builder
	(cd ./toae_server && make image)

.PHONY: worker
worker: alpine_builder
	(cd ./toae_worker && make image)

.PHONY: jaeger
jaeger:
	docker pull jaegertracing/all-in-one:1.50
	docker tag jaegertracing/all-in-one:1.50 $(IMAGE_REPOSITORY)/toae_telemetry_ce:$(DF_IMG_TAG)

.PHONY: graphdb
graphdb:
	docker build -f ./toae_neo4j/Dockerfile --build-arg IMAGE_REPOSITORY=$(IMAGE_REPOSITORY) --build-arg DF_IMG_TAG=$(DF_IMG_TAG) -t $(IMAGE_REPOSITORY)/toae_neo4j_ce:$(DF_IMG_TAG) ./toae_neo4j

.PHONY: ui
ui:
	git log --format="%h" -n 1 > $(TOAE_FRONTEND_DIR)/console_version.txt && \
	echo $(VERSION) > $(TOAE_FRONTEND_DIR)/product_version.txt && \
	docker run --rm --entrypoint=bash -v $(TOAE_FRONTEND_DIR):/app node:18-bullseye-slim -c "cd /app && corepack enable && corepack prepare pnpm@7.17.1 --activate && PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=true pnpm install --frozen-lockfile --prefer-offline && pnpm run build" && \
	docker build -f $(TOAE_FRONTEND_DIR)/Dockerfile -t $(IMAGE_REPOSITORY)/toae_ui_ce:$(DF_IMG_TAG) $(TOAE_FRONTEND_DIR) && \
	rm -rf $(TOAE_FRONTEND_DIR)/console_version.txt $(TOAE_FRONTEND_DIR)/product_version.txt

.PHONY: secretscanner
secretscanner: bootstrap-agent-plugins
	docker build --tag=$(IMAGE_REPOSITORY)/toae_secret_scanner_ce:$(DF_IMG_TAG) -f $(SECRET_SCANNER_DIR)/Dockerfile $(SECRET_SCANNER_DIR)

.PHONY: malwarescanner
malwarescanner: bootstrap-agent-plugins
	docker build --tag=$(IMAGE_REPOSITORY)/toae_malware_scanner_ce:$(DF_IMG_TAG) -f $(MALWARE_SCANNER_DIR)/Dockerfile $(MALWARE_SCANNER_DIR)

.PHONY: packagescanner
packagescanner: bootstrap-agent-plugins
	docker build --tag=$(IMAGE_REPOSITORY)/toae_package_scanner_ce:$(DF_IMG_TAG) -f $(PACKAGE_SCANNER_DIR)/Dockerfile $(PACKAGE_SCANNER_DIR)

.PHONY: compliancescanner
compliancescanner:
	docker build --tag=$(IMAGE_REPOSITORY)/toae_compliance_scanner_ce:$(DF_IMG_TAG) -f $(COMPLIANCE_SCANNER_DIR)/Dockerfile $(COMPLIANCE_SCANNER_DIR)

.PHONY: openapi
openapi: server
	docker run --rm \
	--entrypoint=/usr/local/bin/toae_server \
	-v $(PWD):/app $(IMAGE_REPOSITORY)/toae_server_ce:$(DF_IMG_TAG) \
	--export-api-docs-path /app/openapi.yaml

	rm -rf golang_toae_sdk/client/*

	docker pull openapitools/openapi-generator-cli:latest
	docker run --rm \
	-v $(PWD):/local openapitools/openapi-generator-cli:latest generate \
	-i /local/openapi.yaml \
	-g go \
	-o /local/golang_toae_sdk/client \
	-p isGoSubmodule=true \
	-p packageName=client \
	--git-repo-id golang_toae_sdk \
	--git-user-id toae

	rm openapi.yaml
	cd $(PWD)/golang_toae_sdk/client && rm -rf ./test && sed -i 's/go 1.18/go 1.20/g' go.mod && go mod tidy -v && cd -

.PHONY: cli
cli: bootstrap
	(cd $(TOAE_CTL) && make clean && make all)

.PHONY: publish
publish: publish-redis publish-postgres publish-kafka publish-router publish-minio publish-server publish-worker publish-ui publish-agent publish-cluster-agent publish-packagescanner publish-secretscanner publish-malwarescanner publish-graphdb publish-jaeger

.PHONY: publish-redis
publish-redis:
	docker push $(IMAGE_REPOSITORY)/toae_redis_ce:$(DF_IMG_TAG)

.PHONY: publish-postgres
publish-postgres:
	docker push $(IMAGE_REPOSITORY)/toae_postgres_ce:$(DF_IMG_TAG)

.PHONY: publish-kafka
publish-kafka:
	docker push $(IMAGE_REPOSITORY)/toae_kafka_broker_ce:$(DF_IMG_TAG)

.PHONY: publish-router
publish-router:
	docker push $(IMAGE_REPOSITORY)/toae_router_ce:$(DF_IMG_TAG)

.PHONY: publish-minio
publish-minio:
	docker push $(IMAGE_REPOSITORY)/toae_file_server_ce:$(DF_IMG_TAG)

.PHONY: publish-server
publish-server:
	docker push $(IMAGE_REPOSITORY)/toae_server_ce:$(DF_IMG_TAG)

.PHONY: publish-worker
publish-worker:
	docker push $(IMAGE_REPOSITORY)/toae_worker_ce:$(DF_IMG_TAG)

.PHONY: publish-ui
publish-ui:
	docker push $(IMAGE_REPOSITORY)/toae_ui_ce:$(DF_IMG_TAG)

.PHONY: publish-agent
publish-agent:
	docker push $(IMAGE_REPOSITORY)/toae_agent_ce:$(DF_IMG_TAG)

.PHONY: publish-cluster-agent
publish-cluster-agent:
	docker push $(IMAGE_REPOSITORY)/toae_cluster_agent_ce:$(DF_IMG_TAG)

.PHONY: publish-packagescanner
publish-packagescanner:
	docker push $(IMAGE_REPOSITORY)/toae_package_scanner_ce:$(DF_IMG_TAG)

.PHONY: publish-secretscanner
publish-secretscanner:
	docker push $(IMAGE_REPOSITORY)/toae_secret_scanner_ce:$(DF_IMG_TAG)

.PHONY: publish-malwarescanner
publish-malwarescanner:
	docker push $(IMAGE_REPOSITORY)/toae_malware_scanner_ce:$(DF_IMG_TAG)

.PHONY: publish-graphdb
publish-graphdb:
	docker push $(IMAGE_REPOSITORY)/toae_neo4j_ce:$(DF_IMG_TAG)

.PHONY: publish-jaeger
publish-jaeger:
	docker push $(IMAGE_REPOSITORY)/toae_telemetry_ce:$(DF_IMG_TAG)

.PHONY: clean
clean:
	-(cd $(TOAE_AGENT_DIR) && make clean)
	-(cd $(ROOT_MAKEFILE_DIR)/toae_server && make clean)
	-(cd $(ROOT_MAKEFILE_DIR)/toae_worker && make clean)
	-(cd $(TOAED) && make clean && rm $(TOAE_AGENT_DIR)/toaed)
