FROM alpine:3.18
MAINTAINER TOAE Security Inc
LABEL toae.role=system

ENV TOAE_HTTP_LISTEN_ENDPOINT=8080 \
    TOAE_ACCESS_TOKEN_EXPIRY_MINUTES=5

ADD toae_server/auth /auth
ADD toae_server/cloud_controls /cloud_controls
COPY toae_server/entrypoint.sh /entrypoint.sh

RUN apk add --no-cache --update bash curl libpcap tar kafkacat postgresql15-client

RUN chmod +x /entrypoint.sh

RUN cd /usr/local/share/ && \
    wget https://github.com/swagger-api/swagger-ui/archive/refs/tags/v4.15.5.tar.gz -O /usr/local/share/swagger-ui.tar.gz && \
    tar -xzf /usr/local/share/swagger-ui.tar.gz -C /usr/local/share/ && \
    mv /usr/local/share/swagger-ui-4.15.5/dist /usr/local/share/swagger-ui && \
    rm -rf /usr/local/share/swagger-ui.tar.gz /usr/local/share/swagger-ui-4.15.5

COPY ./toae_server/toae_server /usr/local/bin/toae_server

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
CMD ["/usr/local/bin/toae_server"]
