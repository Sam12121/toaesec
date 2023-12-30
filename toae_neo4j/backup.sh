#!/bin/bash
docker run --rm --volumes-from toae-neo4j -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /data

