#!/bin/sh

set -e

docker-compose -f docker/docker-compose-dev.yml up --build --force-recreate

echo ""
echo "access http://localhost:3000"
