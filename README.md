# EveryWorkflow

A symfony based every workflow platform


Version: Under Development `dev-main`


## Composer dependencies

- `symfony` - Symfony 5 framework and components
- `symfony/asset` - To manage asset files
- `symfony/webpack-encore-bundle` - To manage SPA/PWA(s)
- `doctrine/annotations` - Doctrine annotations
- `twig/twig` - Twig templating
- `nelmio/cors-bundle` - Cors fixes
- `mongodb/mongodb` - Mongodb php core extension library
- `nesbot/carbon` - DateTime helper package
- `everyworkflow/base` - Base bundle package
- `everyworkflow/dam` - Dam bundle package
- `everyworkflow/cms` - Cms bundle package
- `everyworkflow/crm` - Crm bundle package
- `everyworkflow/pim` - Pim bundle package


## Composer dev dependencies

- `phpmd/phpmd`
- `friendsofphp/php-cs-fixer`
- `squizlabs/php_codesniffer`
- `symfony/phpunit-bridge`
- `symfony/debug-bundle`
- `symfony/var-dumper`
- `symfony/web-profiler-bundle`


## Project setup

- Install symfony-dev-docker from https://github.com/readymadehost/symfony-dev-docker
- `git clone https://github.com/everyworkflow/everyworkflow-development.git project --recursive`
- `cd project && git submodule update --recursive --remote && cd ..` to update submodules
- For docker setup use: `cp project/symfony-dev-docker/.env ./.env`
- `cp project/symfony-dev-docker/docker-compose.yml ./docker-compose.yml`
- Make sure docker is configured to use php8.0 and mongodb enabled
- `docker-compose build` to build containers
- `docker-compose up -d` to spin up development containers
- `docker-compose ps` to check status of development containers
- `docker-compose exec cli bash` to get inside cli container

## Symfony setup

- `docker-compose exec cli bash` to get inside cli container
- `composer install` to install composer dependencies
- `bin/console mongo:database:drop` to drop database
- `bin/console mongo:migrate` to migrate mongo migrations


## React setup

- `docker-compose exec cli bash` to get inside cli container if not
- `yarn install` to install node dependencies
- `yarn build` for production build
- `yarn watch` to watch file changes for development
- `yarn watch:admin_panel`
- `yarn watch:frontend`

React app URL:-

- Frontend: http://localhost:8080
- Admin Panel: http://localhost:8080/admin/

## Tests

#### Running symfony tests

- `bin/console --env=test mongo:database:drop`
- `bin/console --env=test mongo:migrate`
- `vendor/bin/phpunit`

#### Running frontend tests

- `yarn test`

#### Generating code coverage

- `XDEBUG_MODE=coverage vendor/bin/phpunit --coverage-html public/test-html`
- Visit: http://localhost:8080/test-html/index.html

## Quick links

- https://symfony.com
- https://twig.symfony.com
- https://docs.mongodb.com/php-library
- https://carbon.nesbot.com
- https://reactjs.org
- https://ant.design
- https://jestjs.io
