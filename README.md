![readme-header](https://user-images.githubusercontent.com/1769678/223572353-788d5d38-cd28-40fa-96cd-9d29226f7e4b.png)

<div align="center">

![GitHub License MIT](https://img.shields.io/github/license/wbkd/react-flow?color=%23ff0072)
![CircleCI](https://circleci.com/gh/markmanx/isoflow.svg?style=shield)

A highly customizable React component for building interactive network diagrams.

Coming soon under the MIT licence | Use it now on [isoflow.io](https://isoflow.io)

</div>

## Key Features

- **Real-time:** Display real-time data on diagrams.
- **Customizable:** Use your own isometric icon packs, or use our free set of networking icons (also under MIT).
- **Export options:** Export diagrams as images, JSON or YAML.
- **Powerful annotation tools:** Annotate nodes, groups and connectors.
- **Step-by-step walkthroughs:** Create interactive tours of large diagrams to help viewers easily digest information.

## Roadmap

Migration to open-source: ██░░░░░░░░░

- [x] Set up automated publishing to NPM registry
- [ ] Migrate private JS project to public Typescript project
  - [x] Pan / Select / Zoom modes
  - [x] Display icons in itemControls
  - [ ] Node controls
  - [ ] Group controls
  - [ ] Connector controls
- [ ] Publish icons as separate importable package

## Installation

Note: Isoflow is currently in development and _NOT_ production ready. To view it's current state of development:

`npm install isoflow`

```
import Isoflow from 'isoflow';

const scene = {
  icons: [
    {
      id: "block",
      name: "Block",
      url: "https://isoflow.io/static/assets/icons/networking/primitive.svg",
      category: "Networking",
    },
  ],
  nodes: [
    {
      id: "a_node",
      label: "A node",
      icon: "block",
      position: {
        x: 0,
        y: 0,
      },
    },
  ],
  connectors: [],
  groups: []
}

const App = () => (
  <Isoflow
    height={500}
    scene={scene}
  >
)
```

If using Next.js, make sure you only import Isoflow in the browser:

```
const Isoflow = dynamic(() => import("isoflow"), {
  ssr: false,
});
```

## Development setup

1. Clone the repo
2. `npm i`
3. `npm run start`
4. Visit `localhost:3000` in your browser

## To deploy to npm

CI is sensitive to any tag pushed to `main` branch. It will build and deploy the app to NPM.
To deploy:

1. Bump the version using `npm version patch` or similar
2. `git push && git push --tags`

## Contributions

See [good first issues](https://github.com/markmanx/isoflow/contribute).

## License

Isoflow is MIT licensed (see ./LICENSE).
