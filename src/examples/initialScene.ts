import { InitialScene, ConnectorStyleEnum } from 'src/Isoflow';
import { mergeIsopacks } from 'src/isopacks';
import basicIsopack from 'src/isopacks/basic';
import networkingIsopack from 'src/isopacks/networking';
import awsIsopack from 'src/isopacks/aws';
import azureIsopack from 'src/isopacks/azure';
import gcpIsopack from 'src/isopacks/gcp';

const mergedIsopacks = mergeIsopacks([
  basicIsopack,
  networkingIsopack,
  awsIsopack,
  azureIsopack,
  gcpIsopack
]);

export const initialScene: InitialScene = {
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
