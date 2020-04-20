#!/bin/sh

set -e

docker-compose up --build --force-recreate -d

echo ""
echo "access http://localhost:3000"
