#!/bin/sh

set -e

docker-compose up --build -d

echo ""
echo "access http://localhost:3000"
