import React, { useCallback, useState, useMemo } from 'react';
import { Alert, useTheme } from '@mui/material';
import Isoflow from 'src/Isoflow';
import { icons } from '../icons';

export const Callbacks = () => {
  const [updatesCounter, setUpdatesCounter] = useState(0);
  const theme = useTheme();
  const onSceneUpdated = useCallback(() => {
    setUpdatesCounter((counter) => {
      return counter + 1;
    });
  }, []);

  const initialScene = useMemo(() => {
    return {
      icons,
      nodes: [
        {
          id: 'server',
          label: '<p>Callbacks example</p>',
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
    };
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
