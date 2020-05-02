#!/bin/sh

set -e

docker-compose -p health-dashboard -f docker/docker-compose.yml down
