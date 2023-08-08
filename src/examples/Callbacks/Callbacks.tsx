import React, { useCallback } from 'react';
import Isoflow from 'src/Isoflow';
import { icons } from '../icons';

export const Callbacks = () => {
  const onSceneUpdated = useCallback(() => {
    console.log('Scene updated');
  }, []);

  return (
    <Isoflow
      initialScene={{
        icons,
        nodes: [
          {
            id: 'server',
            label: 'Callbacks example',
            labelHeight: 40,
            iconId: 'server',
            position: {
              x: 0,
              y: 0
            }
          }
        ],
        connectors: [],
        groups: []
      }}
      onSceneUpdated={onSceneUpdated}
      height="100%"
    />
  );
};
