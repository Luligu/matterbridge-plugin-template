# <img src="https://matterbridge.io/assets/matterbridge.svg" alt="Matterbridge Logo" width="64px" height="64px">&nbsp;&nbsp;&nbsp;Matterbridge Plugin Template

[![npm version](https://img.shields.io/npm/v/matterbridge.svg)](https://www.npmjs.com/package/matterbridge)
[![npm downloads](https://img.shields.io/npm/dt/matterbridge.svg)](https://www.npmjs.com/package/matterbridge)
[![Docker Version](https://img.shields.io/docker/v/luligu/matterbridge/latest?label=docker%20version)](https://hub.docker.com/r/luligu/matterbridge)
[![Docker Pulls](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/Luligu/b21088ab9c9f2b119b42c33f0fef218d/raw/docker.json)](https://hub.docker.com/r/luligu/matterbridge)
![Node.js CI](https://github.com/Luligu/matterbridge-plugin-template/actions/workflows/build.yml/badge.svg)
![CodeQL](https://github.com/Luligu/matterbridge-plugin-template/actions/workflows/codeql.yml/badge.svg)
[![codecov](https://codecov.io/gh/Luligu/matterbridge-plugin-template/branch/main/graph/badge.svg)](https://codecov.io/gh/Luligu/matterbridge-plugin-template)
[![tested with Vitest](https://img.shields.io/badge/tested_with-Vitest-6E9F18.svg?logo=vitest&logoColor=white)](https://vitest.dev)
[![styled with Oxc](https://img.shields.io/badge/styled_with-Oxc-9BE4E0.svg?logo=oxc&logoColor=white)](https://oxc.rs/docs/guide/usage/formatter.html)
[![linted with Oxc](https://img.shields.io/badge/linted_with-Oxc-9BE4E0.svg?logo=oxc&logoColor=white)](https://oxc.rs/docs/guide/usage/linter.html)
[![TypeScript Native](https://img.shields.io/badge/TypeScript_Native-3178C6?logo=typescript&logoColor=white)](https://github.com/microsoft/typescript-go)
[![ESM](https://img.shields.io/badge/ESM-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![ESM](https://img.shields.io/badge/ESM-Bun-000000?logo=bun&logoColor=white)](https://bun.com)
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

- **build.yml**: run on push and pull request and build, lint and test the plugin on node 22, 24 and 26 with ubuntu, macOS and windows.
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

## Development guide

Refer to the Matterbridge [Development guide](https://matterbridge.io/README-DEV.html) for other guidelines.

## Repository toolchain

See [TOOLCHAIN.md](./TOOLCHAIN.md) for compilers, linting, formatting, testing, and editor support.

## Shared agent instructions

See [SHARED-AGENTS.md](./SHARED-AGENTS.md) for shared guidance, rules, skills, and configuration for coding agents.

See [.agents/README.md](./.agents/README.md) for the shared instructions layout and versioning.

## Shared dev container support

See [.devcontainer/README.md](./.devcontainer/README.md) for the shared development container setup and usage.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## Style guide

See [STYLEGUIDE.md](./STYLEGUIDE.md) for code style, naming, documentation, and testing conventions.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history and notable changes.

## Issues and feature requests

Report bugs and suggest improvements on [GitHub Issues](https://github.com/Luligu/matterbridge-plugin-template/issues).

## License

Licensed under the [Apache License 2.0](./LICENSE).

## Support the project

If you find this project useful, please consider giving it a star on [GitHub](https://github.com/Luligu/matterbridge-plugin-template) and sponsoring it. Your support helps maintain and improve the project.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/yellow_img.png)](https://www.buymeacoffee.com/luligugithub)
