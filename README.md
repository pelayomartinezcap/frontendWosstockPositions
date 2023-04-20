# test

One Paragraph of project description goes here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

To get started just run the following commands (allways from the `root` of the project):

**Init Development Environment**

```
cd code
npm run dev:setup
```

**Start SPA**

```
cd code
npm install
npm run start
```

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

## Development

> Make sure all this commands are executed from the `code` folder.

### Build & Packaging

To build and package the application run:

```
npm run build
```

### Testing

#### Unitary Testing

We use [Jest](https://eslint.org/) along with [React Testing Library] to develop and execute the unitary code tests, to execute them just run:

```
npm run test
```

### Code Linting

We use [ESLint](https://eslint.org/) to lint the code, to lint the code just run:

```
npm run lint
```

If you want to auto-fix the linting issues found, just run:

```
npm run lint:fix
```

If you want to format your code following the [Prettier standard](https://prettier.io/) just run:

```
npm run format
```

### Git Hooks

By default there is only configured the `pre-commit` hook, in this hook we just check for linting issues on the staged files following this pattern `(config|src|test)/**/*.(js|jsx)`.

To setup the execution of the hooks, just run:

```
npm run dev:setup
```

### Versioning

We use [SemVer](http://semver.org/) for versioning.
