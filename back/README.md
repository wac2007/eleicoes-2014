# Case backend

A NodeJS server built with the KOA2 framework using TypeScript.

Technologies Used:

* [KOA2](http://koajs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Nodemon](https://nodemon.io/)
* [Docker](https://www.docker.com/)
* [Jest](https://jestjs.io/)

## Prerequisites

* Docker

## Development

During development, the `/app` folder is being watched for changes.

All changes invoke the TypeScript compiler, which restarts the app upon completion.

```shell
yarn watch
```

## Build the Server

To compile the TypeScript code and place into the `/dist` folder:

```shell
yarn build
```

## Code Linter

A TypeScript linter has been added to keep code consistent among developers.

```shell
yarn lint
```

To autofix linting errors (not all errors are auto-fixable):

```shell
yarn fix
```

## Tests and Coverage

For TDD, invoke testing by:

```shell
yarn test
```

Watch mode

```shell
yarn test:watch
```

## Docker

To build a container using the `dockerfile`:

```shell
npm run image:build -- --no-cache
```
