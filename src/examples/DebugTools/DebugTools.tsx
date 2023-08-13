import React from 'react';
import Isoflow from 'src/Isoflow';
import { icons } from '../icons';

export const DebugTools = () => {
  return (
    <Isoflow
      initialScene={{
        icons,
        connectors: [
          {
            id: 'connector1',
            from: 'database',
            to: 'server',
            label: 'connection'
          }
        ],
        groups: [
          {
            id: 'group1',
            nodeIds: ['server', 'database']
          }
        ],
        nodes: [
          {
            id: 'server',
            label: 'Requests per minute',
            labelHeight: 40,
            iconId: 'server',
            position: {
              x: 0,
              y: 0
            }
          },
          {
            id: 'database',
            label: 'Transactions',
            labelHeight: 40,
            iconId: 'server',
            position: {
              x: 5,
              y: 3
            }
          }
        ]
      }}
      debugMode
      height="100%"
    />
  );
};
