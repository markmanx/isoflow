import React, { useCallback, useState } from 'react';
import { Alert, useTheme } from '@mui/material';
import Isoflow, { InitialScene } from 'src/Isoflow';
import { initialScene as _initialScene } from '../initialScene';

const initialScene: InitialScene = {
  icons: _initialScene.icons,
  nodes: [
    {
      id: 'server',
      label: '<p>This is an example of tracking changes to the scene.</p>',
      iconId: 'server',
      position: {
        x: 0,
        y: 0
      }
    }
  ],
  connectors: [],
  textBoxes: [],
  rectangles: []
};

export const Callbacks = () => {
  const [updatesCounter, setUpdatesCounter] = useState(0);
  const theme = useTheme();
  const onSceneUpdated = useCallback(() => {
    setUpdatesCounter((counter) => {
      return counter + 1;
    });
  }, []);

  return (
    <>
      <Isoflow
        initialScene={initialScene}
        onSceneUpdated={onSceneUpdated}
        height="100%"
      />
      <Alert
        sx={{
          position: 'absolute',
          width: 300,
          left: theme.customVars.appPadding.x,
          bottom: theme.customVars.appPadding.y
        }}
        variant="filled"
        severity="info"
        id="alert"
      >
        {updatesCounter} scene updates
      </Alert>
    </>
  );
};
