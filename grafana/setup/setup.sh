#!/bin/sh

set -e

GRAFANA_HOST=http://admin:admin@grafana:3000

curl -X POST \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --data "{\"access\": \"proxy\", \"isDefault\": true, \"name\": \"JSON API\", \"type\": \"simpod-json-datasource\", \"url\": \"http://api:4000\"}" \
  ${GRAFANA_HOST}/api/datasources

echo "grafana setup is done"
