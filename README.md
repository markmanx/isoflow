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

- **Annotation tools:** Annotate your architecture with isometric icons, labels, regions and connectors.
- **Customizable:** Use the standard free set of networking icons (also included under the MIT licence), or create your own.
- **Export options:** Export diagrams as images, JSON or YAML.

## Roadmap

v1 progress: █████████░

- [x] Basic view controls (pan & zoom)
- [x] Create / delete nodes
- [x] Create / delete connectors
- [x] Create / delete rectangle areas
- [x] Generic networking icons (e.g. server, router etc)
- [x] onSceneUpdate callback
- [x] Drag items
- [x] Documentation
- [x] Load / save diagrams locally as JSON
- [ ] Support for AWS and GCP icons

## Quick start

To integrate with your existing React app, install the Isoflow [npm package](https://www.npmjs.com/package/isoflow):

- `npm install isoflow`

## Basic integration:

```jsx
import Isoflow from 'isoflow';
import { networkingIsopack } from 'isoflow/dist/iconpacks';

const initialData = {
  icons: networkingIsopack,
  nodes: [
    {
      id: "node1",
      iconId: "server",
      position: {
        x: 0,
        y: 0,
      },
    },
  ],
  connectors: [],
  rectangles: []
};

const App = () => (
  <Isoflow initialData={initialData} />
);
```

**Note:** Isoflow cannot be server-side rendered.  If using Next.js, make sure you only import Isoflow in the browser:

```jsx
const Isoflow = dynamic(() => import("isoflow"), {
  ssr: false,
});
```

## Running Isoflow in development mode
To run Isoflow on a local development server with hot-reloading enabled:

1. `npm i`
2. `npm run start`.

## Developer documentation
For detailed API documentation, examples and more, see the online [developer documentation](https://v2.isoflow.io/docs).  You can also build and run the docs locally:

- `npm run start:docs`

## CodeSandbox
Demo the latest version of Isoflow on [CodeSandbox](https://codesandbox.io/p/sandbox/github/markmanx/isoflow).  The sandbox will always be synced with the `main` branch on the Github repo, and also includes the latest version of the developer documentation.

## Using Isoflow commercially?
Isoflow is free to use for personal and commercial projects.  If you're using Isoflow commercially, please consider sponsoring the project (please get in touch).

## Contributing
- Isoflow is actively being worked on.  Missing something or found a bug? Report it [here](https://github.com/markmanx/isoflow/issues) or join our [Discord server](https://discord.gg/QYPkvZth7D).
- Want to contribute? See [good first issues](https://github.com/markmanx/isoflow/contribute).