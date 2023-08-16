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
      iconId: 'icon1',
      position: {
        x: 0,
        y: 0
      }
    },
    {
      id: 'node2',
      label: 'Node2',
      iconId: 'icon2',
      position: {
        x: 1,
        y: 1
      }
    },
    {
      id: 'node3',
      label: 'Node3',
      iconId: 'icon1',
      position: {
        x: 2,
        y: 2
      }
    }
  ],
  connectors: [
    {
      id: 'connector1',
      anchors: [{ nodeId: 'node1' }, { nodeId: 'node2' }]
    },
    {
      id: 'connector2',
      anchors: [{ nodeId: 'node2' }, { nodeId: 'node3' }]
    }
  ],
  groups: [{ id: 'group1', from: { x: 0, y: 0 }, to: { x: 2, y: 2 } }]
};
