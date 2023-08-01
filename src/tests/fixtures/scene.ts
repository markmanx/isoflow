import { SceneInput } from 'src/types';

export const scene: SceneInput = {
  icons: [
    {
      id: 'icon1',
      name: 'Icon1',
      url: 'http://example1.com'
    },
    {
      id: 'icon2',
      name: 'Icon2',
      url: 'http://example2.com'
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
    { id: 'connector1', label: 'Connector1', from: 'node1', to: 'node2' },
    { id: 'connector2', label: 'Connector2', from: 'node2', to: 'node3' }
  ],
  groups: [{ id: 'group1', label: 'Group1', nodeIds: ['node1', 'node2'] }]
};
