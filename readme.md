## Menu Planner

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Important

Currently the backend has not enabled CORS, so you'll need to execute Chrome with the security flags as disabled.
To do that you can run from your _terminal_ the following command

```
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```

**Note: Setting your browser with this flag is dangerous, please don't open websites with it, this is only for development purposes**

---

## Dev setup

This repository is based on Node and uses the latest `Webpack` and `Babel` versions, please follow the instructions to install everything needed on your computer before running the following commands.

### Dependencies

You'll need the following packages installed in your computer before running any command.

- `Node` version 9+

### Configuration

```
$ git clone
$ cd repo-name
$ npm i
$ npm start
```

### Development

```
npm run dev // will run dev config
npm run dev:hot // will run dev config with hot reloading
npm start // runs dev:hot by default
```

This repository uses [Semantic Commits](docs/SEMANTIC_COMMITS.md) as the style guide to develop, with feature branches that will be merged to `master` through a Pull Request
You can use the same semantics for commit messages through [commitizen](https://github.com/commitizen/cz-cli)

### Testing

The approach to this project is around functional programming, so please always test your functions with the supplied unit testing suit.

```
$ npm run format // runs prettier to standarize written code
$ npm run lint // verifies none of the linting rules were broken
$ npm run flow // runs static styping suite
$ npm run test // runs the test suite
```

## For Production

Only command needed to start using the App in prod, is build.
It will create a folder called `build/` with all the necessary elements inside in the `root`.

This folder is excluded from the `.git history` by default.

```
$ npm run build
```

## Code Guidelines

They can be found inside the [docs/GUIDELINES.md](docs/GUIDELINES.md)
