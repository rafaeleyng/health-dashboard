#!/bin/sh

set -e

docker-compose up --build --force-recreate

echo ""
echo "access http://localhost:3000"
