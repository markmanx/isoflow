import React from 'react';
import Isoflow, { ConnectorStyleEnum, InitialData } from 'src/Isoflow';
import { networkingIsopack } from 'src/isopacks';

const initialData: InitialData = {
  icons: networkingIsopack,
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

export const BasicEditor = () => {
  return <Isoflow initialData={initialData} />;
};
