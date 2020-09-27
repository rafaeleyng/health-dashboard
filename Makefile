.PHONY: start
start:
	docker-compose -p health-dashboard -f docker/docker-compose.yml up --build --force-recreate -d
	@echo "\naccess http://localhost:3000"

.PHONY: stop
stop:
	docker-compose -p health-dashboard -f docker/docker-compose.yml down

.PHONY: watch
watch:
	docker-compose -p health-dashboard -f docker/docker-compose-dev.yml up --build --force-recreate
	@echo "\naccess http://localhost:3000"