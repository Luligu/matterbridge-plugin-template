# <img src="https://matterbridge.io/assets/matterbridge.svg" alt="Matterbridge Logo" width="64px" height="64px">&nbsp;&nbsp;&nbsp;Matterbridge Plugin Template

[![npm version](https://img.shields.io/npm/v/matterbridge.svg)](https://www.npmjs.com/package/matterbridge)
[![npm downloads](https://img.shields.io/npm/dt/matterbridge.svg)](https://www.npmjs.com/package/matterbridge)
[![Docker Version](https://img.shields.io/docker/v/luligu/matterbridge/latest?label=docker%20version)](https://hub.docker.com/r/luligu/matterbridge)
[![Docker Pulls](https://img.shields.io/docker/pulls/luligu/matterbridge?label=docker%20pulls)](https://hub.docker.com/r/luligu/matterbridge)
![Node.js CI](https://github.com/Luligu/matterbridge-plugin-template/actions/workflows/build.yml/badge.svg)
![CodeQL](https://github.com/Luligu/matterbridge-plugin-template/actions/workflows/codeql.yml/badge.svg)
[![codecov](https://codecov.io/gh/Luligu/matterbridge-plugin-template/branch/main/graph/badge.svg)](https://codecov.io/gh/Luligu/matterbridge-plugin-template)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://prettier.io/)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://eslint.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![ESM](https://img.shields.io/badge/ESM-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![matterbridge.io](https://img.shields.io/badge/matterbridge.io-online-brightgreen)](https://matterbridge.io)

[![powered by](https://img.shields.io/badge/powered%20by-matterbridge-blue)](https://www.npmjs.com/package/matterbridge)
[![powered by](https://img.shields.io/badge/powered%20by-matter--history-blue)](https://www.npmjs.com/package/matter-history)
[![powered by](https://img.shields.io/badge/powered%20by-node--ansi--logger-blue)](https://www.npmjs.com/package/node-ansi-logger)
[![powered by](https://img.shields.io/badge/powered%20by-node--persist--manager-blue)](https://www.npmjs.com/package/node-persist-manager)

This repository provides a default template for developing Matterbridge plugins.

If you like this project and find it useful, please consider giving it a star on [GitHub](https://github.com/Luligu/matterbridge-plugin-template) and sponsoring it.

<a href="https://www.buymeacoffee.com/luligugithub"><img src="https://matterbridge.io/assets/bmc-button.svg" alt="Buy me a coffee" width="120"></a>

## Features

- **Dev Container support for instant development environment**.
- Pre-configured TypeScript, TypeScript Native (tsgo), Oxlint, Oxfmt, Jest and Vitest.
- Example project structure for Accessory and Dynamic platforms.
- Ready for customization for your own plugin.
- The project has an already configured Jest / Vitest test unit (with 100% coverage) that you can expand while you add your own plugin logic.
- Cross-platform scripts to remove Jest or Vitest when you choose one test runner.

## Available workflows

The project has the following already configured workflows:

- **build.yml**: run on push and pull request and build, lint and test the plugin on node 20, 22 and 24 with ubuntu, macOS and windows.
- **publish.yml**: publish on npm under tag latest when you create a new release in GitHub and publish under tag dev on npm from main (or dev if it exist) branch every day at midnight UTC if there is a new commit. The workflow has been updated for trusted publishing / OIDC, so you need to setup the package npm settings to allow it (i.e. authorize publish.yml).
- **codeql.yml**: run CodeQL from the main branch on each push and pull request.
- **codecov.yml**: run CodeCov from the main branch on each push and pull request. You need a codecov account and to add your CODECOV_TOKEN to the repository secrets.

## ⚠️ Warning: GitHub Actions Costs for Private Repositories

**Important**: If you plan to use this template in a **private repository**, be aware that GitHub Actions usage may incur costs:

- **Free tier limits**: Private repositories have limited free GitHub Actions minutes per month (2,000 minutes for free accounts).
- **Workflow intensity**: This template includes multiple workflows that run on different operating systems (Ubuntu, macOS, Windows) and Node.js versions (20, 22, 24), which can consume minutes quickly.
- **Daily automated workflows**: The dev publishing workflows run daily, which can add up over time.
- **Pricing varies by OS**: macOS runners cost 10x more than Ubuntu runners, Windows runners cost 2x more.

**Recommendations for private repos**:

- Monitor your GitHub Actions usage in your account settings.
- Consider disabling some workflows or reducing the OS/Node.js version matrix.
- Review GitHub's [pricing for Actions](https://github.com/pricing) to understand costs.
- For public repositories, GitHub Actions are free with generous limits.

## Getting Started

1. Create a repository from this template using the [template feature of GitHub](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).
2. Clone it locally and open the cloned folder project with [VS Code](https://code.visualstudio.com/). If you have docker or docker desktop, just run `code .`.
3. When prompted, reopen in the devcontainer. VS Code will automatically build and start the development environment with all dependencies installed.
4. Update the code and configuration files as needed for your plugin. Change the name (keep always matterbridge- at the beginning of the name), version, description, author, homepage, repository, bugs and funding in the package.json.
5. Follow the instructions in the matterbridge [README-DEV](https://github.com/Luligu/matterbridge/blob/main/README-DEV.md) and comments in module.ts to implement your plugin logic.

## Periodical Updates

This template evolves over time to keep up with Matterbridge, Node.js, TypeScript, and the surrounding tooling ecosystem. Periodically pulling in the latest template changes helps your plugin benefit from:

- Security and dependency updates (Node.js and tooling).
- CI improvements (new Node versions, workflow hardening, and cross-platform fixes).
- Developer experience updates (Dev Container tweaks, lint/format configs, test runner updates).

If your plugin repository was created from this template, it’s a good habit to review new template releases/commits and selectively copy the relevant files into your plugin repo. Typical “template-owned” areas to keep in sync include:

- `.claude/` (Claude AI settings)
- `.codex/` (Codex AI settings)
- `.devcontainer/` (development environment and extensions)
- `.github/` (Copilot AI setting and build/publish/CodeQL/Codecov pipelines)
- `.vscode/` (repo settings and tasks coordinated with tooling configs)
- `AGENTS.md` (Codex AI instructions)
- `CLAUDE.md` (Claude AI instructions)
- `STYLEGUIDE.md` (Generic AI instructions)
- Tooling configs like `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig*.json`, `jest.config.js`, `vite.config.ts`
- Helper scripts under `scripts/` (release/version automation)

Tip: prefer copying and adapting these files rather than rewriting them from scratch—staying close to the template makes future updates faster and less error-prone.

## Using the Dev Container

- Docker Desktop or Docker Engine are required to use the Dev Container.
- Devcontainer works correctly on Linux, macOS, Windows, WSL2.
- The devcontainer provides Node.js, npm, TypeScript, ESLint, Prettier, Jest, Vitest and other tools and extensions pre-installed and configured.
- The dev branch of Matterbridge is already build and installed into the Dev Container and linked to the plugin. The plugin is automatically added to matterbridge.
- The devcontainer is optimized using named mounts for node_modules, .cache and matterbridge.
- You can run, build, and test your plugin directly inside the container.
- To open a terminal in the devcontainer, use the VS Code terminal after the container starts.
- All commands (npm, tsc, matterbridge etc.) will run inside the container environment.
- All the source files are on the host.

## Dev containers networking limitations

Dev containers have networking limitations depending on the host OS and Docker setup.

• Docker Desktop on Windows or macOS:

- Runs inside a VM
- Host networking mode is NOT available
- Use the Matterbridge Plugin Dev Container system (https://matterbridge.io/reflector/MatterbridgeDevContainer.html) for development and testing. It provides a similar environment to the native Linux setup with the following features:

  ✅ Is possible to pair with an Home Assistant instance running in docker compose on the same host

  ✅ mDNS works normally inside the containers

  ✅ Remote and local network access (cloud services, internet APIs) work normally

  ✅ Matterbridge and plugins work normally

  ✅ Matterbridge frontend works normally

- Use the Matterbridge mDNS Reflector with the Matterbridge Plugin Dev Container system (https://matterbridge.io/reflector/Reflector.html) if you want to pair with a controller on the local network with the following features:

  ✅ Is possible to pair with a controller running on the local network using mDNS reflector

  ✅ mDNS, remote and local network access (cloud services, internet APIs) work normally

  ✅ Matterbridge and plugins work normally

  ✅ Matterbridge frontend works normally

• Native Linux or WSL 2 with Docker Engine CLI integration:

- ✅ Host networking IS available (with --network=host)

- ✅ Full local network access is supported

- ✅ Matterbridge and plugins work correctly, including pairing

- ✅ Matterbridge frontend works normally

## Repository setup

> **Note:** This repository uses a new toolchain. It replaces the traditional TypeScript / ESLint / Prettier / Jest stack with a faster, lighter setup.

- The traditional TypeScript package has been replaced by **[TypeScript Native](https://github.com/microsoft/typescript-go)**. The `typescript` package is kept only as a publish-time dependency while tsgo is still in preview.
- **No ESLint, no Prettier** — replaced by the [oxc](https://oxc.rs) stack: **[oxlint](https://oxc.rs/docs/guide/usage/linter.html)** for linting and **[oxfmt](https://oxc.rs/docs/guide/usage/formatter.html)** for formatting.
- Testing with Jest but also **[Vitest](https://vitest.dev)**, which is much faster and natively supports ESM without extra configuration.
- **Far fewer development dependencies** — the number of installed packages drops from **~600** to **~80** if you only use Vitest. A clean install is much faster.
- **Much faster linting and formatting** — oxlint and oxfmt run in a fraction of the time required by the ESLint / Prettier pipeline.
- **Much faster builds** — tsgo compiles the project in a fraction of the time required by the standard `tsc` build.
- **Editor support** — uses the VS Code extensions for tsgo and oxc to get the same experience in the editor.

## Remove Jest

If you only want to use Vitest (better choice cause it is much faster and natively supports ESM without extra configuration), run the following commands to remove Jest, its tests, configuration, scripts, and unused dependencies. `shx` provides the file-removal commands on Windows, macOS, and Linux.

```shell
npm install shx  --no-fund --no-audit --no-save
npx shx rm -rf test jest.config.js tsconfig.jest.json
node -e "const fs = require('node:fs'); const path = 'tsconfig.json'; const config = JSON.parse(fs.readFileSync(path, 'utf8')); config.compilerOptions.types = config.compilerOptions.types.filter((type) => type !== 'jest'); config.include = config.include.filter((include) => include !== 'test/**/*.ts'); fs.writeFileSync(path, JSON.stringify(config, null, 2) + '\n');"
npm pkg delete automator.jest scripts.test scripts.test:watch scripts.test:verbose scripts.test:coverage scripts.test:vitest scripts.test:vitest:watch scripts.test:vitest:verbose scripts.test:vitest:coverage
npm pkg set "scripts.test=vitest run" "scripts.test:watch=vitest watch" "scripts.test:verbose=vitest run --reporter verbose" "scripts.test:coverage=vitest run --coverage --coverage.thresholds.statements=100 --coverage.thresholds.branches=100 --coverage.thresholds.lines=100 --coverage.thresholds.functions=100" "scripts.runMeBeforePublish=npm run cleanBuild && npm run format && npm run lint && npm run build && npm run typecheck && npm run test:coverage"
npm uninstall @jest/globals @types/jest cross-env jest ts-jest
npm run softReset
```

## Remove Vitest

If you only want to use Jest, run the following commands to remove Vitest, its tests, configuration, scripts, and unused dependencies. `shx` provides the file-removal commands on Windows, macOS, and Linux.

```shell
npm install shx --no-fund --no-audit --no-save
npx shx rm -rf vitest vite.config.ts
node -e "const fs = require('node:fs'); const path = 'tsconfig.json'; const config = JSON.parse(fs.readFileSync(path, 'utf8')); config.compilerOptions.types = config.compilerOptions.types.filter((type) => type !== 'vitest/globals'); config.include = config.include.filter((include) => include !== 'vitest/**/*.ts'); fs.writeFileSync(path, JSON.stringify(config, null, 2) + '\n');"
npm pkg delete automator.vitest scripts.test:vitest scripts.test:vitest:watch scripts.test:vitest:verbose scripts.test:vitest:coverage
npm pkg set "scripts.runMeBeforePublish=npm run cleanBuild && npm run format && npm run lint && npm run build && npm run typecheck && npm run test:coverage"
npm uninstall @vitest/coverage-v8 vitest
npm run softReset
```

## Style guide

See also the [Style Guide](./STYLEGUIDE.md) for JSDoc, naming, and logging conventions used in this repository.

## Copilot instructions

| File                                                             | Notes                                                            |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `.github/copilot-instructions.md`                                | Main project instructions — always loaded                        |
| `.github/instructions/matterbridge/matterbridge.instructions.md` | Matterbridge endpoint guide — dedicated Copilot instruction file |
| `.github/instructions/testing/unit-tests.instructions.md`        | Testing standards — scoped to `**/*.test.ts`                     |

## Claude instructions

| File                                                      | Notes                                                 |
| --------------------------------------------------------- | ----------------------------------------------------- |
| `CLAUDE.md`                                               | Main project instructions — always loaded             |
| `.claude/rules/matterbridge/matterbridge.instructions.md` | Matterbridge endpoint guide — loaded for all contexts |
| `.claude/rules/testing/unit-tests.instructions.md`        | Testing standards — scoped to `**/*.test.ts`          |

## Codex/Agents instructions

| File                         | Notes                                             |
| ---------------------------- | ------------------------------------------------- |
| `AGENTS.md`                  | Main project instructions                         |
| `.codex/config.toml`         | Codex project permissions, approvals, and profile |
| `.codex/rules/default.rules` | Codex command allow, prompt, and deny rules       |

## Documentation

Refer to the Matterbridge [documentation](https://matterbridge.io) for other guidelines.

---
