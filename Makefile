setup:
	docker buildx build --platform linux/amd64 -f Dockerfile -t gonzalobertomeu/lacampana-dev .
up: setup
	docker compose up -d
down:
	docker compose down
up-it: setup
	docker compose up
