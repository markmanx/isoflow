import React, { useCallback } from 'react';
import { Typography } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Isoflow from 'src/Isoflow';
import { icons } from '../icons';

const Snackbar = () => {
  return <Typography>Scene updated!</Typography>;
};

const Example = () => {
  const { enqueueSnackbar } = useSnackbar();
  const onSceneUpdated = useCallback(() => {
    enqueueSnackbar(<Snackbar />, {
      autoHideDuration: 1000,
      preventDuplicate: true
    });
  }, [enqueueSnackbar]);

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

export const Callbacks = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <Example />
    </SnackbarProvider>
  );
};
