all: toaectl

vendor: go.mod $(shell find ../toae_utils -path ../toae_utils/vendor -prune -o -name '*.go')
	go mod tidy -v
	go mod vendor

toaectl: vendor $(shell find . -path ./vendor -prune -o -name '*.go')
	CGO_ENABLED=0 go build -ldflags="-s -w -X main.Version=${VERSION} -extldflags=-static" -buildvcs=false -o toaectl

clean:
	-rm toaectl

.PHONY: all clean
