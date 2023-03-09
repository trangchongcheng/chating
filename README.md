# Core API

## Requirements

```shell
docker >= 1.18.0
node = ^12
```

## Setup local infrastructure

```shell
$ docker-compose up
```

## Environment

```shell
$ cp .env.example .env
```

## Fetch submodules 

```shell
$ git submodule update --init --recursive
```

## Install dependencies

```bash
$ yarn
```

## Migrations
- Run migrations

```shell
$ npm run dbm:run
```

- Generate new migration

```shell
$ npm run dbm:generate --name=MigrationName
```

## Run app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# Run test
$ npm run test

# Run test watch
$ npm run test:watch

# Run test with coverage
$ npm run test:cov
```
