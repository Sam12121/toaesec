#!/bin/sh
set -e

if [ -z "$TOAE_POSTGRES_USER_DB_PASSWORD" ]; then
  export TOAE_POSTGRES_USER_DB_PASSWORD="toae"
fi

if [ -z "$TOAE_POSTGRES_USER_DB_USER" ]; then
  export TOAE_POSTGRES_USER_DB_USER="toae"
fi

until pg_isready -h "${TOAE_POSTGRES_USER_DB_HOST}" -p "${TOAE_POSTGRES_USER_DB_PORT}" -U "${TOAE_POSTGRES_USER_DB_USER}" -d "${TOAE_POSTGRES_USER_DB_NAME}"; 
do
  echo >&2 "Postgres is unavailable - sleeping"
  sleep 5
done

# check migrations complete
# psql -U ${TOAE_POSTGRES_USER_DB_USER} -d ${TOAE_POSTGRES_USER_DB_NAME} -t -c "SELECT EXISTS(SELECT name FROM role WHERE name = 'admin')"
export PGPASSWORD=${TOAE_POSTGRES_USER_DB_PASSWORD}
until psql -h "${TOAE_POSTGRES_USER_DB_HOST}" -U ${TOAE_POSTGRES_USER_DB_USER} -p "${TOAE_POSTGRES_USER_DB_PORT}" "${TOAE_POSTGRES_USER_DB_NAME}" -c '\q'; 
do
  echo >&2 "Database is unavailable - sleeping"
  sleep 5
done
echo >&2 "Database is available"

# wait for neo4j to start
until nc -z ${TOAE_NEO4J_HOST} ${TOAE_NEO4J_BOLT_PORT};
do 
  echo "neo4j is unavailable - sleeping"
  sleep 5; 
done

# wait for kafka connection
until kcat -L -b ${TOAE_KAFKA_BROKERS};
do
  echo "kafka is unavailable - sleeping"
  sleep 5;
done

# wait for file server to start
if [ "$TOAE_MINIO_HOST" != "s3.amazonaws.com" ]; then
  until nc -z ${TOAE_MINIO_HOST} ${TOAE_MINIO_PORT};
  do
    echo "file server is unavailable - sleeping"
    sleep 5;
  done
else
  echo "S3 mode skip file server health check"
fi

sed -i "s/https:\/\/petstore.swagger.io\/v2\/swagger.json/\/toae\/openapi.json/g" /usr/local/share/swagger-ui/swagger-initializer.js

exec "$@"
