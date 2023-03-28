import type { SceneI, IconI, NodeI } from "./validation/SceneSchema";

export const icons: IconI[] = [
  {
    id: "block",
    name: "Block",
    url: "https://isoflow.io/static/assets/icons/networking/primitive.svg",
    category: "Networking",
  },
  {
    id: "pyramid",
    name: "Pyramid",
    url: "https://isoflow.io/static/assets/icons/networking/pyramid.svg",
    category: "Networking",
  },
  {
    id: "sphere",
    name: "Sphere",
    url: "https://isoflow.io/static/assets/icons/networking/sphere.svg",
    category: "Networking",
  },
  {
    id: "diamond",
    name: "Diamond",
    url: "https://isoflow.io/static/assets/icons/networking/diamond.svg",
    category: "Networking",
  },
  {
    id: "cube",
    name: "Cube",
    url: "https://isoflow.io/static/assets/icons/networking/cube.svg",
  },
  {
    id: "pyramid",
    name: "Pyramid",
    url: "https://isoflow.io/static/assets/icons/networking/pyramid.svg",
    category: "Generic",
  },
  {
    id: "sphere",
    name: "Sphere",
    url: "https://isoflow.io/static/assets/icons/networking/sphere.svg",
    category: "Generic",
  },
  {
    id: "diamond",
    name: "Diamond",
    url: "https://isoflow.io/static/assets/icons/networking/diamond.svg",
    category: "Generic",
  },
];

export const nodes: NodeI[] = [
  {
    id: "Node1",
    label: "Node 1",
    icon: "block",
    position: {
      x: 0,
      y: 0,
    },
  },
];

export const mockScene: SceneI = {
  icons,
  nodes,
  connectors: [],
  groups: [],
};
