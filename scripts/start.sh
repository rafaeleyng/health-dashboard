#!/bin/sh

set -e

docker-compose -p health-dashboard -f docker/docker-compose.yml up --build --force-recreate -d

echo ""
echo "access http://localhost:3000"
