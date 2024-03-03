# logger

This is the logger package for all TypeScript projects in Glaminstants.

## Use it

```bash
yarn add @glaminstants/logger
```

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
