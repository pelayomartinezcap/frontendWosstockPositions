# Release process

Here's a repeatable workflow to release a new version of this software using Inditex's internal tools and following the
[Semantic Versioning](https://semver.org/) specification. This process includes manual and automated activities.

## Prerequisites

Before you start, make sure you meet the following prerequisites:
- A consistent commit pattern
- Project follows Semantic Versioning specification
- Current project version is a SNAPSHOT

## Steps of the release process

Behind the release of a new version there is always a **code** change in `main` branch and a trigger.
Three different tools are involved in this process: Github Actions, Changelog Drafter (see [documentation](https://developers.inditex.com/tools/changelog-drafter/index.html)) and, 
the release tool used by this project. Check the specific documentation of your project's technology to see more details.

### Manual first step: Pull request to `main` branch and release type

The release process starts with opening a pull request to the `main` branch. There are three possible branches that can
bring changes to the `main` branch: `develop`, `release` and `hotfix` (see [branching strategy](CONTRIBUTING.md#branching-strategy)). Also, **pull request labels** will determine
how the release workflow behaves: Changelog Drafter driven or user driven.

**Changelog Drafter driven: Release _current_ version (Recommended)**

If a pull request is merged to `main` from a `develop`, `release` or `hotfix` branch with the `release-type/current` label, Changelog Drafter is
going to infer the appropriate version number according to the information provided by the Git history and/or the labels of the issues
detected from the issue tracker used by the project. For more information on this, see [commit patterns](https://github.com/inditex/changelog-drafter#commit-patterns) and [issue types](https://github.com/inditex/changelog-drafter#issue-types--log-categories).

**User driven: Release major/minor/patch version**

The user can select the release type via labels and this request will be delivered to the Changelog Drafter.

|                                                    | Major                                                          | Minor                                  | Patch                               |
|----------------------------------------------------|----------------------------------------------------------------|----------------------------------------|-------------------------------------|
| Kind of changes established by Semantic Versioning | _Breaking changes_, backwards **incompatible** new functionality   | Backwards compatible new functionality | Backwards compatible bug fixes      |
| Changes come to `main` from                        | `develop`  or  `release`                                       | `develop`  or  `release`               | `develop` ,  `release`  or `hotfix` |
| Pull Request label                                 | `release-type/major`                                           | `release-type/minor`                   | `release-type/patch` or `release-type/hotfix` or `release-type/multi-hotfix` (for a [multi-hotfix scenario](CONTRIBUTING.md#multi-hotfix)) |

The typical use case for this workflow is to release a version _higher_ than the type of changes introduced (e.g. releasing a new minor version when there are only bug fixes).
- WARNING: Changelog Drafter will **break the workflow** if the selected version increment does not cover the types of changes introduced (e.g. releasing a new patch version when there are new features).
  A specific version can be _forced_ adding the label `release-mode/force` (but this is **not recommended**).
  With this label, Changelog Drafter will avoid checking if there is an inconsistency between the issues that enter the release, and the requested version increment.
  In any case, for more information or other questions, go to the troubleshooting section of the [Github CI/CD wiki](https://github-cicd.docs.inditex.dev/githubcicd/0.1.0-SNAPSHOT/additional-i).

Test this workflow locally with:
```bash
changelog-drafter release [--major|--minor|--patch] [--force-release-mode]
```
More on this command under the [release preparation](https://github.com/inditex/changelog-drafter#release-preparation) section of the Changelog Drafter documentation.

### Automated second step: Update CHANGELOG and set version

This step is managed by a Github Actions workflow triggered by the merge of the previous pull request to the `main` branch. In this step
two new commits are added to `main` branch.

First a changelog update from Changelog Drafter:
```
[changelog-drafter] Prepare release X.Y.Z
```
Various changes are then applied depending on the technology of the project, the most important being the setting of its **final version**
Please refer to your technology-specific release workflow documentation for more details on these changes.

```
[technology] Prepare release X.Y.Z
```
And finally the corresponding Git tag for the release is set.

### Supervised third step: Sync release X.Y.Z to develop

Once the `main` branch has the latest changes, a _Sync back pull request_ will be automatically created by the release workflow. 
It implies the creation of an `automated/sync-release-X.Y.Z-to-develop` branch from `main` and an automated pull request to `develop`. 
This pull request is left for team approval as it may need some additional work (typically, when the `develop` branch is already ahead).

