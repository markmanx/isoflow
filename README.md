![readme-header](https://user-images.githubusercontent.com/1769678/223572353-788d5d38-cd28-40fa-96cd-9d29226f7e4b.png)

<h4 align="center">
  <a href="https://v2.isoflow.io/">Isoflow Editor</a> |
  <a href="https://v2.isoflow.io/docs">Documentation</a> |
  <a href="https://github.com/markmanx/isoflow">Github</a> |
  <a href="https://discord.gg/QYPkvZth7D">Discord</a>
</h4>

<div align="center">
  <h1>An open-source React component for drawing network diagrams.</h2>
</div>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![CircleCI](https://circleci.com/gh/markmanx/isoflow.svg?style=shield)

</div>

## Key Features

- **Highly visual drag and drop interface:** Express your architecture with icons, regions and connectors.
- **Customizable:** Easily extend Isoflow with your own icons.
- **Export options:** Export diagrams as code or images.

## Roadmap

🛠 v0.6: In progress
- [x] More control over connector segments
- [x] Connector labels
- [ ] Layer re-ordering (bring forward / send to back)
- [ ] Shortcuts (undo / redo, copy / paste)
- [ ] Custom colours
- [ ] Export diagrams as images
- [ ] Main menu customisation
- [ ] Center diagram in middle of canvas

✅ v0.5: Complete
- [x] Basic view controls (pan / zoom)
- [x] Nodes, connectors & groups
- [x] Import / export diagrams to local storage (in JSON format)
- [x] Icon support for AWS, GCP, Azure, K8S & generic network hardware (e.g. server, database)
- [x] onModelUpdated callback
- [x] Documentation
- [x] Pipeline for publishing to NPM

## Quick start

Install the Isoflow editor [npm package](https://www.npmjs.com/package/isoflow) and isopacks (icon packages):

- `npm install isoflow`
- `npm install @isoflow/isopacks`

For more information, see our [documentation](https://v2.isoflow.io/docs).

## CodeSandbox demo
Demo the latest version of Isoflow on [CodeSandbox](https://codesandbox.io/p/sandbox/github/markmanx/isoflow).  The sandbox will always be synced with the `main` branch on the Github repo, and also includes the latest version of the developer documentation.

## Using Isoflow commercially?
Isoflow is free to use for personal and commercial projects.  If you're using Isoflow commercially, please consider sponsoring the project (please get in touch).

## Contributing
- Isoflow is actively being worked on.  Missing something or found a bug? Report it [here](https://github.com/markmanx/isoflow/issues) or join our [Discord server](https://discord.gg/QYPkvZth7D).
- Want to contribute? See [good first issues](https://github.com/markmanx/isoflow/contribute).