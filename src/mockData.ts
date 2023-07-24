import type {
  SceneInput,
  IconInput,
  NodeInput
} from 'src/validation/SceneSchema';

export const icons: IconInput[] = [
  {
    id: 'block',
    name: 'Block',
    url: 'https://isoflow.io/static/assets/icons/networking/primitive.svg',
    category: 'Networking'
  },
  {
    id: 'pyramid',
    name: 'Pyramid',
    url: 'https://isoflow.io/static/assets/icons/networking/pyramid.svg',
    category: 'Networking'
  },
  {
    id: 'sphere',
    name: 'Sphere',
    url: 'https://isoflow.io/static/assets/icons/networking/sphere.svg',
    category: 'Networking'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    url: 'https://isoflow.io/static/assets/icons/networking/diamond.svg',
    category: 'Networking'
  },
  {
    id: 'cube',
    name: 'Cube',
    url: 'https://isoflow.io/static/assets/icons/networking/cube.svg'
  },
  {
    id: 'pyramid',
    name: 'Pyramid',
    url: 'https://isoflow.io/static/assets/icons/networking/pyramid.svg',
    category: 'Generic'
  },
  {
    id: 'sphere',
    name: 'Sphere',
    url: 'https://isoflow.io/static/assets/icons/networking/sphere.svg',
    category: 'Generic'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    url: 'https://isoflow.io/static/assets/icons/networking/diamond.svg',
    category: 'Generic'
  }
];

export const nodes: NodeInput[] = [
  {
    id: 'Node1',
    label: 'Node 1',
    iconId: 'block',
    position: {
      x: 0,
      y: 0
    }
  }
];

export const mockScene: SceneInput = {
  icons,
  nodes,
  connectors: [],
  groups: [],
  gridSize: {
    width: 51,
    height: 51
  }
};
