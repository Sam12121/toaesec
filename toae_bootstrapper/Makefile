VERSION?=v`git describe --tags`

all: toae_bootstrapper

local: toae_bootstrapper

prepare:
	docker run --rm -i -e VERSION=${VERSION} -v $(ROOT_MAKEFILE_DIR):/src:rw -v /tmp/go:/go:rw toaeio/toae_builder_ce:$(DF_IMG_TAG) bash -c 'cd /src/toae_bootstrapper && make toae_bootstrapper'

vendor: go.mod $(shell find ../toae_utils -path ../toae_utils/vendor -prune -o -name '*.go')
	go mod tidy -v
	go mod vendor

toae_bootstrapper: vendor $(shell find . -path ./vendor -prune -o -name '*.go') $(shell find ./assets/ -name '*.ini')
	CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w -X main.Version=${VERSION} -extldflags=-static" -buildvcs=false
	-upx ./toae_bootstrapper

clean:
	-rm toae_bootstrapper
	-rm -rf ./vendor

.PHONY: clean image local all
