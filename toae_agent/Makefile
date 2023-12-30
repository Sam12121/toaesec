#
# TOAE.IO CONFIDENTIAL
# _________________________
#
# [2014 - 2022] toae Inc
# All Rights Reserved.
#
# NOTICE:  All information contained herein is, and remains
# the property of toae.io and its suppliers,
# if any.  The intellectual and technical concepts contained
# herein are proprietary to toae.io
# and its suppliers and may be covered by U.S. and Foreign Patents,
# patents in process, and are protected by trade secret or copyright law.
# Dissemination of this information or reproduction of this material
# is strictly forbidden unless prior written permission is obtained
# from toae.io.
#

.PHONY: agent

GOFLAGS += --ldflags
GOFLAGS += '-extldflags "-static"'
VERSION?=v`git rev-parse --short HEAD`

LN = ln
MKDIR = mkdir
CD = cd
CP = cp

gocode:
	echo "Building go binary for cloud metadata instance id..."
	($(CD) tools/apache/toae/df-utils/get_cloud_instance_id && CGO_ENABLED=0 go build -o getCloudInstanceId $(GOFLAGS) .)

install:

tools/apache/scope/vendor: tools/apache/scope/go.mod $(shell find ../toae_utils -path ../toae_utils/vendor -prune -o -name '*.go') $(shell find ./tools/apache/scope -path ./tools/apache/scope/vendor -prune -o -name '*.go')
	($(CD) tools/apache/scope && go mod tidy -v)
	($(CD) tools/apache/scope && go mod vendor)

agent: tools/apache/scope/vendor
	($(CD) tools/apache/scope && \
		env GOGC=off \
		CGO_ENABLED=1 \
		go build -buildvcs=false \
		-ldflags "-X main.version=${VERSION} -X github.com/weaveworks/scope/probe/host.agentCommitID=${VERSION} -X github.com/weaveworks/scope/probe/host.agentBuildTime=$(shell date +"%s%d%m%y") -s -w -extldflags=-static"\
		-tags 'netgo osusergo unsafe' \
		-o docker/toae_exe \
		./prog)

clean:
	-$(RM) tools/apache/toae/df-utils/getCloudInstanceId
	-$(RM) tools/apache/scope/docker/toae_exe
	-(cd plugins && make clean)
	-$(RM) -rf tools/apache/scope/vendor
