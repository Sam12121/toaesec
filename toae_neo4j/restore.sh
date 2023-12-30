#!/bin/sh
docker run --rm --volumes-from toae-neo4j -v $(pwd):/backup ubuntu bash -c "cd /data && tar xvf /backup/backup.tar --strip 1"

