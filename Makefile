setup:
	docker buildx build --platform linux/amd64 -f bun.dockerfile -t gonzalobertomeu/bun-runtime-dev .

up: setup
	docker compose up -d
down:
	docker compose down
up-it: setup
	docker compose up

install-bun:
	curl -fsSL https://bun.com/install | bash
