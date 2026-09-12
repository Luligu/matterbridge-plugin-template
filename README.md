# <img src="https://matterbridge.io/assets/matterbridge.svg" alt="Matterbridge Logo" width="64px" height="64px">&nbsp;&nbsp;&nbsp;Matterbridge Plugin Template

[![npm version](https://img.shields.io/npm/v/matterbridge.svg)](https://www.npmjs.com/package/matterbridge)
[![npm downloads](https://img.shields.io/npm/dt/matterbridge.svg)](https://www.npmjs.com/package/matterbridge)
[![Docker Version](https://img.shields.io/docker/v/luligu/matterbridge/latest?label=docker%20version)](https://hub.docker.com/r/luligu/matterbridge)
[![Docker Pulls](https://img.shields.io/docker/pulls/luligu/matterbridge?label=docker%20pulls)](https://hub.docker.com/r/luligu/matterbridge)
![Node.js CI](https://github.com/Luligu/matterbridge-plugin-template/actions/workflows/build.yml/badge.svg)
![CodeQL](https://github.com/Luligu/matterbridge-plugin-template/actions/workflows/codeql.yml/badge.svg)
[![codecov](https://codecov.io/gh/Luligu/matterbridge-plugin-template/branch/main/graph/badge.svg)](https://codecov.io/gh/Luligu/matterbridge-plugin-template)
[![tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18.svg?logo=vitest&logoColor=white)](https://vitest.dev)
[![styled with Oxc](https://img.shields.io/badge/styled_with-Oxc-9BE4E0.svg?logo=oxc&logoColor=white)](https://oxc.rs/docs/guide/usage/formatter.html)
[![linted with Oxc](https://img.shields.io/badge/linted_with-Oxc-9BE4E0.svg?logo=oxc&logoColor=white)](https://oxc.rs/docs/guide/usage/linter.html)
[![TypeScript Native](https://img.shields.io/badge/TypeScript_Native-3178C6?logo=typescript&logoColor=white)](https://github.com/microsoft/typescript-go)
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
- Pre-configured TypeScript, TypeScript Native (tsgo), Oxlint, Oxfmt and Vitest.
- Example project structure for Accessory and Dynamic platforms.
- Ready for customization for your own plugin.
- The project has an already configured Vitest test unit (with 100% coverage) that you can expand while you add your own plugin logic.

## Available workflows

The project has the following already configured workflows:

- **build.yml**: run on push and pull request and build, lint and test the plugin on node 22, 24 and 26 with ubuntu, macOS and windows. Node.js 20.19 is still supported in package.json but is not tested in CI as it has reached EOL.
- **publish.yml**: publish on npm under tag latest when you create a new release in GitHub and publish under tag dev on npm from main (or dev if it exist) branch every day at midnight UTC if there is a new commit. The workflow has been updated for trusted publishing / OIDC, so you need to setup the package npm settings to allow it (i.e. authorize publish.yml).
- **codeql.yml**: run CodeQL on the main and dev branches on each push and pull request.
- **codecov.yml**: run CodeCov on the main and dev branches on each push and pull request. You need a codecov account and to add your CODECOV_TOKEN to the repository secrets.
- **chip-tests.yml**: run the CHIP conformance test suite on ubuntu every monday at 03:00 UTC and on demand (workflow_dispatch). See [chipTests.md](./chipTests.md) and the `chip:start`, `chip:test` and `chip:stop` scripts.

## ⚠️ Warning: GitHub Actions Costs for Private Repositories

**Important**: If you plan to use this template in a **private repository**, be aware that GitHub Actions usage may incur costs:

- **Free tier limits**: Private repositories have limited free GitHub Actions minutes per month (2,000 minutes for free accounts).
- **Workflow intensity**: This template includes multiple workflows that run on different operating systems (Ubuntu, macOS, Windows) and Node.js versions (22, 24, 26), which can consume minutes quickly.
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
3. When prompted, reopen in the devcontainer and select a runtime (**Matterbridge Plugin Node Dev Container** or **Matterbridge Plugin Bun Dev Container**). VS Code will automatically build and start the development environment with all dependencies installed.
4. Update the code and configuration files as needed for your plugin. Change the name (keep always matterbridge- at the beginning of the name), version, description, author, homepage, repository, bugs and funding in the package.json.
5. Follow the instructions in the matterbridge [README-DEV](https://github.com/Luligu/matterbridge/blob/main/README-DEV.md) and comments in module.ts to implement your plugin logic.

## Periodical Updates

This template evolves over time to keep up with Matterbridge, Node.js, TypeScript, and the surrounding tooling ecosystem. Periodically pulling in the latest template changes helps your plugin benefit from:

- Security and dependency updates (Node.js and tooling).
- CI improvements (new Node versions, workflow hardening, and cross-platform fixes).
- Developer experience updates (Dev Container tweaks, lint/format configs, test runner updates).

If your plugin repository was created from this template, it’s a good habit to review new template releases/commits and selectively copy the relevant files into your plugin repo. Typical “template-owned” areas to keep in sync include:

- `.agents/` (shared agent instructions: rules and skills — the single source of truth)
- `.antigravity/` (Gemini / Antigravity settings)
- `.claude/` (Claude AI settings, mirrored rules and skills)
- `.codex/` (Codex AI settings)
- `.devcontainer/` (development environment and extensions)
- `.github/` (Copilot AI settings, mirrored rules and skills, and build/publish/CodeQL/Codecov/CHIP pipelines)
- `.vscode/` (repo settings and tasks coordinated with tooling configs)
- `AGENTS.md` (shared agent instructions)
- `CLAUDE.md` (Claude AI instructions)
- `GEMINI.md` (Gemini / Antigravity instructions)
- `STYLEGUIDE.md` (Generic AI instructions)
- Tooling configs like `.oxlintrc.json`, `.oxfmtrc.json`, `tsconfig*.json`, `vite.config.ts`
- Helper scripts under `scripts/` (release/version/CHIP automation)

Tip: prefer copying and adapting these files rather than rewriting them from scratch—staying close to the template makes future updates faster and less error-prone.

## Using the Dev Container

- Docker Desktop or Docker Engine are required to use the Dev Container.
- Devcontainer works correctly on Linux, macOS, Windows, WSL2.
- Two runtime variants are available, `.devcontainer/node` and `.devcontainer/bun`: choose one when you reopen in the container. See [.devcontainer/README.md](./.devcontainer/README.md) for the lifecycle scripts, volumes and host setup.
- The devcontainer provides Node.js (or Bun), npm, TypeScript Native (tsgo), oxlint, oxfmt, Vitest and other tools and extensions pre-installed and configured.
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

## Style guide

See also the [Style Guide](./STYLEGUIDE.md) for JSDoc, naming, and logging conventions used in this repository.

## Repository toolchain

> **Note:** This repository uses a new toolchain. It replaces the traditional TypeScript / ESLint / Prettier / Jest stack with a faster and lighter setup.

- **No `typescript 6.x` package** — replaced by [TypeScript Native 7.x](https://github.com/microsoft/typescript-go).
- **No ESLint, no Prettier** — replaced by the [oxc](https://oxc.rs) stack: [oxlint](https://oxc.rs/docs/guide/usage/linter.html) for linting and [oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) for formatting.
- **No Jest** — replaced by [Vitest](https://vitest.dev), which is much faster and natively supports ESM without extra configuration.
- **Far fewer development dependencies** — the number of installed packages drops from **~600** to **~75**. A clean install is much faster.
- **Much faster linting and formatting** — oxlint and oxfmt run in a fraction of the time required by the ESLint / Prettier pipeline.
- **Much faster builds** — tsgo compiles the project in a fraction of the time required by the standard `tsc` build.
- **Editor support** — use the VS Code extensions for tsgo and oxc to get the same experience in the editor.

## Agent instructions

[AGENTS.md](./AGENTS.md) and [.agents/](./.agents/) are the **single source of truth** for the instructions given to every coding agent. The per-agent folders below are pointers and mirrors: edit `.agents/` (or `AGENTS.md`), never the copies. See [.agents/README.md](./.agents/README.md) for the full layout.

| File                                            | Notes                                                 |
| ----------------------------------------------- | ----------------------------------------------------- |
| `AGENTS.md`                                     | Main project instructions — shared by every agent     |
| `.agents/README.md`                             | Layout and versioning of the shared instructions      |
| `.agents/rules/testing.instructions.md`         | Testing standards for unit tests                      |
| `.agents/rules/matterbridge.instructions.md`    | Creating endpoints and using the single-class devices |
| `.agents/rules/plugin-frontend.instructions.md` | Serving a plugin's own frontend SPA and REST API      |
| `.agents/rules/chip-tests.instructions.md`      | The CHIP conformance test harness                     |
| `.agents/skills/verify-agent-context/SKILL.md`  | Workflow to verify the agent loaded this context      |

## Copilot instructions

| File                                                                   | Notes                                                                              |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `.github/copilot-instructions.md`                                      | Pointer to AGENTS.md — always loaded                                               |
| `.github/instructions/chip-tests/chip-tests.instructions.md`           | CHIP conformance test harness — scoped to CHIP test files                          |
| `.github/instructions/matterbridge/matterbridge.instructions.md`       | Matterbridge endpoint guide — dedicated Copilot instruction file                   |
| `.github/instructions/plugin-frontend/plugin-frontend.instructions.md` | Plugin frontend SPA and custom REST API guide — scoped to frontend and plugin code |
| `.github/instructions/testing/testing.instructions.md`                 | Testing standards — scoped to `**/*.test.ts`                                       |
| `.github/skills/verify-agent-context/SKILL.md`                         | Skill invocable as `/verify-agent-context`                                         |

## Claude instructions

| File                                                            | Notes                                                                              |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `CLAUDE.md`                                                     | Pointer to AGENTS.md — always loaded                                               |
| `.claude/settings.json`                                         | Claude permissions: allow, ask and deny rules                                      |
| `.claude/rules/chip-tests/chip-tests.instructions.md`           | CHIP conformance test harness — scoped to CHIP test files                          |
| `.claude/rules/matterbridge/matterbridge.instructions.md`       | Matterbridge endpoint guide — loaded for all contexts                              |
| `.claude/rules/plugin-frontend/plugin-frontend.instructions.md` | Plugin frontend SPA and custom REST API guide — scoped to frontend and plugin code |
| `.claude/rules/testing/testing.instructions.md`                 | Testing standards — scoped to `**/*.test.ts`                                       |
| `.claude/skills/verify-agent-context/SKILL.md`                  | Skill invocable as `/verify-agent-context`                                         |

## Codex instructions

| File                         | Notes                                             |
| ---------------------------- | ------------------------------------------------- |
| `AGENTS.md`                  | Main project instructions                         |
| `.codex/config.toml`         | Codex project permissions, approvals, and profile |
| `.codex/rules/default.rules` | Codex command allow, prompt, and deny rules       |

## Gemini / Antigravity instructions

| File                         | Notes                                                 |
| ---------------------------- | ----------------------------------------------------- |
| `GEMINI.md`                  | Pointer to AGENTS.md — always loaded                  |
| `.antigravity/settings.json` | Sandboxing and permissions: allow, ask and deny rules |

## Development guide

Refer to the Matterbridge [Development guide](https://matterbridge.io/README-DEV.html) for other guidelines.

---
