import React from 'react';
import Isoflow from 'src/Isoflow';
import icons from '../icons';

export const DebugTools = () => {
  return (
    <Isoflow
      initialData={{
        icons,
        connectors: [],
        rectangles: [
          {
            id: 'rectangle1',
            from: {
              x: 5,
              y: 5
            },
            to: {
              x: 0,
              y: 0
            }
          }
        ],
        nodes: [
          {
            id: 'server',
            label: 'Requests per minute',
            iconId: 'server',
            position: {
              x: 0,
              y: 0
            }
          },
          {
            id: 'database',
            label: 'Transactions',
            iconId: 'block',
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
