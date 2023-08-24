![readme-header](https://user-images.githubusercontent.com/1769678/223572353-788d5d38-cd28-40fa-96cd-9d29226f7e4b.png)

<h4 align="center">
  <a href="https://codesandbox.io/p/sandbox/github/markmanx/isoflow">Isoflow Editor</a> |
  <a href="https://github.com/markmanx/isoflow">Github</a> |
  <a href="https://discord.gg/efXxbsha">Discord</a>
</h4>

<div align="center">
  <h1>An open-source network diagram editor for React.</h2>
</div>

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![CircleCI](https://circleci.com/gh/markmanx/isoflow.svg?style=shield)

</div>

## Key Features

- **Annotation tools:** Annotate your architecture with isometric icons, labels, regions and connectors.
- **Customizable:** Use your own isometric icon packs, or the standard free set of networking icons (also under MIT).
- **Export options:** Export diagrams as images, JSON or YAML.

## Roadmap

Beta release progress: ███████░░

- [x] Basic view controls (pan & zoom)
- [x] Create / delete nodes
- [x] Create / delete rectangle areas
- [x] Create / delete connectors
- [x] onSceneUpdate callback
- [x] Drag items
- [x] Iconpacks
- [ ] Export options

## Quick start

Install the [Isoflow npm package](https://www.npmjs.com/package/isoflow):
```
npm install isoflow
```

Render a diagram:

```
import Isoflow from 'isoflow';

const scene = {
  icons: [
    {
      id: "block",
      name: "Block",
      url: "https://isoflow.io/static/assets/icons/networking/primitive.svg"
    },
  ],
  nodes: [
    {
      id: "node1",
      icon: "block",
      position: {
        x: 0,
        y: 0,
      },
    },
  ],
  connectors: [],
  rectangles: []
}

const App = () => (
  <Isoflow
    height={500}
    initialScene={scene}
  >
)
```

If using Next.js, make sure you only import Isoflow in the browser:

```
const Isoflow = dynamic(() => import("isoflow"), {
  ssr: false,
});
```

## Codesandbox

You can preview the latest version of Isoflow on Codesandbox [here](https://codesandbox.io/p/sandbox/github/markmanx/isoflow/tree).
The sandbox is always synced with the Github repo.

## Contributing
- Missing something or found a bug? Report it [here](https://github.com/markmanx/isoflow/issues).
- Want to contribute? See [good first issues](https://github.com/markmanx/isoflow/contribute).

# For contributors

## Deploying to NPM

CI is sensitive to any tag pushed to `main` branch. It will build and deploy the app to NPM.
To deploy:

1. Bump the version using `npm version patch` or similar
2. `git push && git push --tags`

### Branching Strategy:

Branches are named using the following convention:

- `feature/` for new feature implementations
- `fix/` for broken code / build / bug fixes
- `chore/` non-breaking & non-fixing code changes such as linting, formatting, etc.

#### Commit / PR Strategy:

- Commits are to be squashed prior to merge
- PRs are to target a singular issue in order to keep the commit history clean and easy to follow

## License

Isoflow is MIT licensed (see ./LICENSE).
