import { InitialData, ConnectorStyleEnum } from 'src/Isoflow';
import { basicIsopack, networkingIsopack, mergeIsopacks } from 'src/isopacks';

const mergedIsopacks = mergeIsopacks([basicIsopack, networkingIsopack]);

export const initialData: InitialData = {
  icons: mergedIsopacks,
  nodes: [
    {
      id: 'database',
      iconId: 'storage',
      label: 'Database',
      position: {
        x: 2,
        y: -2
      }
    },
    {
      id: 'server',
      iconId: 'server',
      label: 'Server',
      labelHeight: 100,
      position: {
        x: 2,
        y: 2
      }
    },
    {
      id: 'client',
      iconId: 'laptop',
      label: 'Client',
      labelHeight: 100,
      position: {
        x: -1,
        y: 0
      }
    }
  ],
  connectors: [
    {
      id: 'connector1',
      anchors: [{ nodeId: 'server' }, { nodeId: 'database' }]
    },
    {
      id: 'connector2',
      style: ConnectorStyleEnum.DOTTED,
      width: 10,
      anchors: [
        { nodeId: 'server' },
        { tile: { x: -1, y: 2 } },
        { nodeId: 'client' }
      ]
    }
  ],
  textBoxes: [],
  rectangles: [
    {
      id: 'rect1',
      from: {
        x: 3,
        y: 3
      },
      to: {
        x: 1,
        y: -3
      }
    }
  ]
};
