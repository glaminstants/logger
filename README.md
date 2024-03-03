# logger

This is the logger package for all TypeScript projects in Glaminstants.

## Use it

```bash
yarn add @glaminstants/logger
```

### Configuration

In order to configure the HTTP transport layer, there are a few environment variables needed in the context of the consumer app:

| Name            | Description                                |
| --------------- | ------------------------------------------ |
| APP_NAME        | Application name (e.g. `orders-service`)   |
| ENVIRONMENT     | Environment (e.g. `staging`, `production`) |
| DATADOG_API_KEY | Datadog's API key                          |

## Setup for local dev

```bash
yarn
```

## Release

To release a new version:

1. It is **imperative** to bump the `version` in [`package.json`](./package.json)
2. Create PR with proposed changes
3. Merge PR and release workflow should take place in `master` branch.

### Pre-release

A pre-release can be issued if the code is pushed to the `alpha` and `beta` channels.
