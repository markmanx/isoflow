import React from 'react';
import Isoflow from 'src/App';
import { icons } from '../icons';

export const CustomNode = () => {
  return (
    <Isoflow
      initialScene={{
        icons,
        connectors: [],
        groups: [],
        nodes: [
          {
            id: 'Node1',
            labelElement: <>Node</>,
            iconId: 'block',
            position: {
              x: 0,
              y: 0
            }
          }
        ]
      }}
    />
  );
};
