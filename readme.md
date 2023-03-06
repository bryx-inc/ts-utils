# Bryx TS Utils
This library serves as a shared collection of common typescript utility methods.

## Installation
If you have not already, set up scoping `bryxinc` to the bryx gitlab instance.

```
$ echo @bryxinc:registry=https://gitlab.com/api/v4/packages/npm/ >> .npmrc
```

Additionally, if you have not already, make sure you have correctly configured your gitlab access token.

```
$ npm config set -- '//gitlab.com/api/v4/packages/npm/:_authToken' "<your_token>"
$ npm config set -- '//gitlab.com/api/v4/projects/44033793/packages/npm/:authToken' "<your_token>"
```

Then, install the package.
```
$ yarn add @bryxinc/ts-utils
```

## Documentation

Library documentation is generated with [TypeDoc](https://github.com/TypeStrong/TypeDoc), and can be built locally.

```
$ yarn docs
$ npx serve public/
```

The most up-to-date documentation is hosted at [https://bryxinc.gitlab.io/common/ts-utils](https://bryxinc.gitlab.io/common/ts-utils).

## Deployments

`bryxinc/ts-utils` follows semantic versioning. Changes should be submitted via a [merge request](https://gitlab.com/bryxinc/common/ts-utils/-/merge_requests/new) and, once merged, a new package should be rolled out.

To roll out a new deployment, ensure the working branch is the `main` branch.

```
$ git branch
* main
```

then, to roll out a patch/minor/major release

```
$ yarn release:patch
$ yarn release:minor
$ yarn release:major
```

alternativly, with `npm`

```
$ npm run release:patch
$ npm run release:minor
$ npm run release:major
```

This bumps the package version, packs and pushes the npm package, and then pushes the committed version bump, as well as a new git tag.
