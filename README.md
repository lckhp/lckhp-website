# Leo Club of Kathmandu Himalayas Patan Website

Welcome to LCKHP repository! This README provides a comprehensive guide to our branching conventions and naming strategies to maintain clarity and organization within our development workflow.

## Table of Contents

- [Branching Conventions](#branching-conventions)
  - [Main/Master Branch](#mainmaster-branch)
  - [Feature Branches](#feature-branches)
  - [Bugfix Branches](#bugfix-branches)
  - [Hotfix Branches](#hotfix-branches)
  - [Testing Branches](#testing-branches)
  - [Other Branches](#other-branches)
- [Examples](#examples)

## Branching Conventions

To keep our codebase maintainable and comprehensible, we follow specific branching conventions. This section outlines the purpose and naming strategy for each type of branch.

### Main/Master Branch

The `main` or `master` branch is reserved for stable releases.

- **Branch Name:** `rel`
- Before pushing live to GH with npm run deploy, always PR to this branch.

### Feature Branches

Feature branches are used for developing new features and enhancements.

- **Prefix:** `feature/`
- **Naming Convention:** `feature/<user>/<branch-name>`

### Bugfix Branches

Bugfix branches address minor issues and bugs in the codebase.

- **Prefix:** `bugfix/`
- **Naming Convention:** `bugfix/<user>/<branch-name>`

### Hotfix Branches

Hotfix branches are for critical fixes that need to be addressed immediately.

- **Prefix:** `hotfix/`
- **Naming Convention:** `hotfix/<user>/<branch-name>`

### Testing Branches

Testing branches are dedicated to testing purposes and should not be merged into the `main` or `master` branch.

- **Prefix:** `test/`
- **Naming Convention:** `test/<user>/<branch-name>`

### Other Branches

These branches are stale branches kept just for references. Do not commit into these.

- **old-html:**

  - This branch contains old code rendering loading page with HTML and CSS.

- **new-react**
  - This branch contains oldest react code when just migrated from old-html.

## Examples

Here are some examples of branch names following our conventions:

- **Feature Branches:**
  - `feature/aarush/user-login`
  - `feature/aarati/dashboard`
- **Bugfix Branches:**
  - `bugfix/aarush/view-changes`
- **Hotfix Branches:**
  - `hotfix/enji/critical-login-issue`

---

Let's Code!
