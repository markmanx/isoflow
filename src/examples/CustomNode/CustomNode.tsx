import React from 'react';
import Isoflow from 'src/Isoflow';
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
            labelElement: (
              <>
                This is a custom label. You can display whatever you want here
              </>
            ),
            iconId: 'block',
            position: {
              x: 0,
              y: 0
            }
          }
        ]
      }}
      height="100%"
    />
  );
};
