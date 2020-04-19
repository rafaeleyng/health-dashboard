#!/bin/sh

set -e

docker-compose up -d

echo ""
echo "access http://localhost:3000"
echo "admin credentials are admin/admin"
