import React, { useCallback, useState } from 'react';
import { Alert, useTheme } from '@mui/material';
import Isoflow, { InitialData } from 'src/Isoflow';
import { initialData as _initialData } from '../initialData';

const initialData: InitialData = {
  icons: _initialData.icons,
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
        initialData={initialData}
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
