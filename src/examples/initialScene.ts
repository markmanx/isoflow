/* eslint-disable import/no-extraneous-dependencies */
import { InitialScene, ConnectorStyleEnum } from 'src/Isoflow';
import { flattenCollections } from '@isoflow/isopacks/dist/utils';
import isoflowIsopack from '@isoflow/isopacks/dist/isoflow';
import awsIsopack from '@isoflow/isopacks/dist/aws';
import gcpIsopack from '@isoflow/isopacks/dist/gcp';
import azureIsopack from '@isoflow/isopacks/dist/azure';
import kubernetesIsopack from '@isoflow/isopacks/dist/kubernetes';

const isopacks = flattenCollections([
  isoflowIsopack,
  awsIsopack,
  azureIsopack,
  gcpIsopack,
  kubernetesIsopack
]);

export const initialScene: InitialScene = {
  icons: isopacks,
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
      anchors: [{ ref: { node: 'server' } }, { ref: { node: 'database' } }]
    },
    {
      id: 'connector2',
      style: ConnectorStyleEnum.DOTTED,
      width: 10,
      anchors: [
        { ref: { node: 'server' } },
        { ref: { tile: { x: -1, y: 2 } } },
        { ref: { node: 'client' } }
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
