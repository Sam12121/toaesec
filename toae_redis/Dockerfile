FROM redis:7.2-alpine3.18

MAINTAINER TOAE Security Inc
LABEL toae.role=system

COPY redis.conf /usr/local/etc/redis/

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
