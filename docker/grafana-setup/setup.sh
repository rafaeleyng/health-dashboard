#!/bin/sh

set -e

GRAFANA_HOST=http://admin:admin@grafana:3000

# create datasource
curl -X POST \
  --header "Accept: application/json" \
  --header "Content-Type: application/json" \
  --data "{\"access\": \"proxy\", \"isDefault\": true, \"name\": \"JSON API\", \"type\": \"simpod-json-datasource\", \"url\": \"http://api:4000\"}" \
  ${GRAFANA_HOST}/api/datasources

# create dashboards
for FILE in dashboards/*.json; do
  echo $FILE
  curl -X POST \
    --header "Accept: application/json" \
    --header "Content-Type: application/json" \
    -d "@${FILE}"  \
    ${GRAFANA_HOST}/api/dashboards/db
done

echo ""
echo "grafana setup is done, finishing setup container"
