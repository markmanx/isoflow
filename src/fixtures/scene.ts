import { SceneInput } from 'src/types';

export const scene: SceneInput = {
  icons: [
    {
      id: 'icon1',
      name: 'Icon1',
      url: 'https://isoflow.io/static/assets/icons/networking/server.svg'
    },
    {
      id: 'icon2',
      name: 'Icon2',
      url: 'https://isoflow.io/static/assets/icons/networking/block.svg'
    }
  ],
  nodes: [
    {
      id: 'node1',
      label: 'Node1',
      icon: 'icon1',
      tile: {
        x: 0,
        y: 0
      }
    },
    {
      id: 'node2',
      label: 'Node2',
      icon: 'icon2',
      tile: {
        x: 1,
        y: 1
      }
    },
    {
      id: 'node3',
      label: 'Node3',
      icon: 'icon1',
      tile: {
        x: 2,
        y: 2
      }
    }
  ],
  connectors: [
    {
      id: 'connector1',
      anchors: [{ ref: { node: 'node1' } }, { ref: { node: 'node2' } }]
    },
    {
      id: 'connector2',
      anchors: [
        { id: 'anchor1', ref: { node: 'node2' } },
        { ref: { node: 'node3' } }
      ]
    }
  ],
  textBoxes: [],
  rectangles: [{ id: 'rectangle1', from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }]
};
