# Coding Conventions for TypeScript projects

Here's a list of useful resources that everyone should check before contributing to this project.

## Table of Contents

1. [TypeScript Style guide](#typescript-style-guide)
   * [Set up](#set-up)
   * [Style guide reference](#style-guide-reference)
   * [Exclusions](#exclusions)
   * [Configuring ESLint locally](#configuring-eslint-locally)
2. [Package manager](#package-manager)
   * [Managing dependencies with npm](#managing-dependencies-with-npm)
3. [Documentation style guide](#documentation-style-guide)

## TypeScript Style guide

To maintain consistency in the format of our code base, we provide an [ESLint](https://eslint.org/) configuration file with rules agreed upon company-wide and distributed as an npm package: [`@inditex/eslint-config`](https://github.com/inditex/lib-eslintconfiginditex).

### Set up

To lint your files according to the organization style guide, please follow [these instructions](https://github.com/inditex/lib-eslintconfiginditex#inditextypescript) to ensure a correct configuration. You only have to install the `@inditex/eslint-config` package and then configure your `.eslintrc` with the instructions for Typescript projects.

### Style guide reference

> Notice that ESLint will not apply any rule by default. Rules have to be explicitly activated via configuration.

Our style guide consists of 3 sets of rules, divided based on their function:

- **Formatting rules**: (ex: `max-len`, `no-mixed-spaces-and-tabs`, `keyword-spacing`, etc.):
These rules are intended to ensure consistency of formatting throughout the code. The formatting standard that we are imposing is defined by [Prettier](https://prettier.io/), which is an opinionated code formatter.
Prettier is used as a format **standard**. This means that ESLint has the Prettier plugin configured and will format the code according to the Prettier standard. Prettier is transparent to the developer.

  - The `printWidth` limit was extended to **120 characters** of maximum line length.

- **Naming-convention rules**: (ex: `@typescript-eslint/naming-convention`, `id-length`, etc.):
Naming rules allow us to point out those names that deviate from the standard; they are the only way to ensure a consistent naming pattern throughout the code base. Prettier standard does not set any naming rules.
We provide the [Google TypeScript Naming Guide](https://google.github.io/styleguide/tsguide.html#syntax) as the reference for all naming conventions. To keep consistency with our Javascript rules, we recommend using [kebab-case](https://google.github.io/styleguide/jsguide.html#file-name) for naming `.ts` files.

    > Some style rules can not be checked with ESLint. Please make sure you have read the documentation on the [recommended syntax](https://google.github.io/styleguide/tsguide.html#syntax) and the code follows all the naming rules.
- **Code-quality rules**: (ex: `no-unused-vars`, `no-extra-bind`, `prefer-promise-reject-errors`, etc.):
Another job that modern linters do is to ensure minimum code quality. ESLint applies, in addition to the formatting and naming rules, a set of code-quality rules.
We follow the [unobtrusive configuration](https://github.com/suchipi/eslint-config-unobtrusive) to ensure that language-specific best practices are followed. The goal is to achieve a good balance between helping the developer and interfering with their good judgment.

We also include some TypeScript-specific [rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts) recommended by `typescript-eslint`.

### Exclusions
Although all style-guide rules should be followed, there may be some particular cases where a specific rule needs to be disabled: an exclusion needs to be defined. The preferred way to deal with exclusions is using [configuration comments](https://eslint.org/docs/latest/user-guide/configuring/rules#using-configuration-comments-1).
Thanks to *configuration comments* you can disable a particular rule by placing a comment next to the code that would raise the error.

A configuration comment should be the way to go in most cases, but if you need to disable some rules for a **group** of test or config files, you can also define an [overrides](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#how-do-overrides-work) section inside your `.eslintrc`.

### Configuring ESLint locally
As mentioned above, you only need ESLint installed as a `devDependency` in your `package.json`. To avoid continually running an `npm lint` script, many developers choose to configure the linter inside their editor/IDE.

We encourage you to configure [ESLint inside your IDE](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) to obtain direct feedback while coding.
> **Note that you should not be making use of Prettier directly!** Thanks to the [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier), ESLint will highlight all deviations from the Prettier standard and autoformat the files accordingly. Your project should not have a `.prettierrc` file and Prettier should not be configured in your IDE.

## Package manager

The tool used to build, package, test and verify the project is [npm](https://docs.npmjs.com/about-packages-and-modules#about-packages). An npm package is defined by the [package.json](https://docs.npmjs.com/creating-a-package-json-file) file. If you need additional information, please read "[What is npm?](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/)" and review the [official documentation](https://docs.npmjs.com/getting-started).

### Managing dependencies with npm

Every time you install or update a dependency via `npm install`, `npm` will generate/update the `package-lock.json` file with the concrete versions installed. Remember that `package-lock.json` file **must be tracked** with `git` as it provides the ability to consistently reproduce the `node_modules` dependencies directory without having to commit the directory itself.

You must also make sure all non-runtime dependencies are installed as `devDependencies` with the `--save-dev` option.
## Documentation style guide

Check out GitHub's [Mastering Markdown](https://guides.github.com/features/mastering-markdown/) to learn about the basic syntax and *GitHub Flavored Markdown*.
