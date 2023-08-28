![readme-header](https://user-images.githubusercontent.com/1769678/223572353-788d5d38-cd28-40fa-96cd-9d29226f7e4b.png)

<h4 align="center">
  <a href="https://codesandbox.io/p/sandbox/github/markmanx/isoflow">Isoflow Editor</a> |
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

V1 release progress: █████████░

- [x] Basic view controls (pan & zoom)
- [x] Create / delete nodes
- [x] Create / delete connectors
- [x] Create / delete rectangle areas
- [x] Node icons (e.g. server, router etc)
- [ ] Cloud service icons (i.e. AWS + GCP icons)
- [x] onSceneUpdate callback
- [x] Drag items
- [x] Documentation
- [x] Load / save diagram (locally as JSON)


## Quick start

Install the Isoflow [npm package](https://www.npmjs.com/package/isoflow):
```bash
npm install isoflow
```

Basic usage is as follows:

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

## Developer documentation
For more detailed API documentation, examples and more, see the [developer documentation](https://v2.isoflow.io/docs).

## CodeSandbox

Demo the latest version of Isoflow on Codesandbox [here](https://codesandbox.io/p/sandbox/github/markmanx/isoflow/tree).
The sandbox is always synced with the Github repo.

## Contributing
- Isoflow is actively being worked on.  Missing something or found a bug? Report it [here](https://github.com/markmanx/isoflow/issues) or join our [Discord server](https://discord.gg/efXxbsha).
- Want to contribute? See [good first issues](https://github.com/markmanx/isoflow/contribute).