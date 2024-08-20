include .env

default: up

JS_APP_ROOT ?= sbagov-breakeven-app
JS_APP_ASSETS ?= sbagov-breakeven
COMPOSER_ROOT ?= /var/www/html
DRUPAL_ROOT ?= /var/www/html/web

## help	:	Print commands help.
.PHONY: help
ifneq (,$(wildcard docker.mk))
help : docker.mk
	@sed -n 's/^##//p' $<
else
help : Makefile
	@sed -n 's/^##//p' $<
endif

## up	:	Start up containers.
.PHONY: up
up:
	@echo "Starting up containers for $(PROJECT_NAME)..."
	docker compose pull
	docker compose up -d --remove-orphans
	make build-app
	make install-custom-module

## build-app	:	build the js app and relocate the library assets
.PHONY: build-app
build-app:
	@echo "Installing..."
	npm install --prefix  custom/$(PROJECT_NAME)/$(JS_APP_ROOT)
	@echo "Building SBA breakeven calculator..."
	npm run build --prefix  custom/$(PROJECT_NAME)/$(JS_APP_ROOT)
	@echo "Copy js asset..."
	cp custom/$(PROJECT_NAME)/$(JS_APP_ROOT)/build/js/$(JS_APP_ASSETS).min.js custom/$(PROJECT_NAME)/js/
	@echo "Copy css asset..."
	cp custom/$(PROJECT_NAME)/$(JS_APP_ROOT)/build/css/$(JS_APP_ASSETS).min.css custom/$(PROJECT_NAME)/css/


## down	:	Stop containers.
.PHONY: down
down: stop

## start	:	Start containers without updating.
.PHONY: start
start:
	@echo "Starting containers for $(PROJECT_NAME) from where you left off..."
	@docker compose start

## stop	:	Stop containers.
.PHONY: stop
stop:
	@echo "Stopping containers for $(PROJECT_NAME)..."
	@docker compose stop

## prune	:	Remove containers and their volumes.
##		You can optionally pass an argument with the service name to prune single container
##		prune mariadb	: Prune `mariadb` container and remove its volumes.
##		prune mariadb solr	: Prune `mariadb` and `solr` containers and remove their volumes.
.PHONY: prune
prune:
	@echo "Removing containers for $(PROJECT_NAME)..."
	@docker compose down -v $(filter-out $@,$(MAKECMDGOALS))

## ps	:	List running containers.
.PHONY: ps
ps:
	@docker ps --filter name='$(PROJECT_NAME)*'

## shell	:	Access `php` container via shell.
##		You can optionally pass an argument with a service name to open a shell on the specified container
.PHONY: shell
shell:
	docker exec -ti -e COLUMNS=$(shell tput cols) -e LINES=$(shell tput lines) $(shell docker ps --filter name='$(PROJECT_NAME)_$(or $(filter-out $@,$(MAKECMDGOALS)), 'php')' --format "{{ .ID }}") sh

## composer	:	Executes `composer` command in a specified `COMPOSER_ROOT` directory (default is `/var/www/html`).
##		To use "--flag" arguments include them in quotation marks.
##		For example: make composer "update drupal/core --with-dependencies"
.PHONY: composer
composer:
	docker exec $(shell docker ps --filter name='^/$(PROJECT_NAME)_php' --format "{{ .ID }}") composer --working-dir=$(COMPOSER_ROOT) $(filter-out $@,$(MAKECMDGOALS))

## drush	:	Executes `drush` command in a specified `DRUPAL_ROOT` directory (default is `/var/www/html/web`).
##		To use "--flag" arguments include them in quotation marks.
##		For example: make drush "watchdog:show --type=cron"
.PHONY: drush
drush:
	docker exec $(shell docker ps --filter name='^/$(PROJECT_NAME)_php' --format "{{ .ID }}") drush -r $(DRUPAL_ROOT) $(filter-out $@,$(MAKECMDGOALS))

## logs	:	View containers logs.
##		You can optinally pass an argument with the service name to limit logs
##		logs php	: View `php` container logs.
##		logs nginx php	: View `nginx` and `php` containers logs.
.PHONY: logs
logs:
	@docker compose logs -f $(filter-out $@,$(MAKECMDGOALS))

# install our custom module into Drupals custom module directory
.PHONY: install-custom-module
install-custom-module:
	@docker cp -a custom $(PROJECT_NAME)_php:$(DRUPAL_ROOT)/modules/

.PHONY: exports-custom-module
exports-custom-module:
	@docker cp -a $(PROJECT_NAME)_php:$(DRUPAL_ROOT)/modules/ custom

.PHONY: app-dev
app-dev:
	@echo "Installing..."
	npm install --prefix  custom/$(PROJECT_NAME)/$(JS_APP_ROOT)
	@echo "Start dev..."
	npm run dev --prefix  custom/$(PROJECT_NAME)/$(JS_APP_ROOT)

# https://stackoverflow.com/a/6273809/1826109
%:
	@:
