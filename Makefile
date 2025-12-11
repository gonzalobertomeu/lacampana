setup:
	docker buildx build --platform linux/amd64 -f Dockerfile -t gonzalobertomeu/lacampana-dev .
up: setup
	docker compose up -d
down:
	docker compose down
up-it: setup
	docker compose up

client-install:
	@if [[ -z "$(package)" ]]; then \
		echo "Missing package:"; \
		echo "		make client-install package=<package>"; \
		exit 1; \
	fi
	@echo "Installing $(package) in client service"
	docker compose exec client pnpm install --save $(package)
engine-install:
	@if [[ -z "$(package)" ]]; then \
		echo "Missing package:"; \
		echo "		make engine-install package=<package>"; ; \\
		exit 1; \
	fi
	@echo "Installing $(package) in engine service"
	docker compose exec engine pnpm install --save $(package)
