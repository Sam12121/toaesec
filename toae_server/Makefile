VERSION=`git describe --tags`
GIT_COMMIT=`git rev-parse HEAD`
BUILD_TIME=`date -u +%FT%TZ`

all: toae_server

local: toae_server

image:
	docker run --rm -i -v $(ROOT_MAKEFILE_DIR):/src:rw -v /tmp/go:/go:rw toaeio/toae_builder_ce:$(DF_IMG_TAG) bash -c 'cd /src/toae_server && make toae_server'
	docker build -f ./Dockerfile -t $(IMAGE_REPOSITORY)/toae_server_ce:$(DF_IMG_TAG) ..

vendor: go.mod $(shell find ../toae_utils -path ../toae_utils/vendor -prune -o -name '*.go')
	go mod tidy -v
	go mod vendor

toae_server: vendor $(shell find . -path ./vendor -prune -o -name '*.go')
	go build -buildvcs=false -ldflags="-s -w -X main.Version=${VERSION} -X main.Commit=${GIT_COMMIT} -X main.BuildTime=${BUILD_TIME}"

clean:
	-rm toae_server
	-rm -rf ./vendor

.PHONY: all clean image local
