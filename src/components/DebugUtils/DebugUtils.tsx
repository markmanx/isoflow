import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { SizeIndicator } from './SizeIndicator';

export const DebugUtils = () => {
  const {
    customVars: { appPadding }
  } = useTheme();
  const { scroll, mouse } = useUiStateStore(({ scroll, mouse }) => {
    return { scroll, mouse };
  });

  return (
    <>
      <SizeIndicator />
      <Box
        sx={{
          position: 'absolute',
          left: appPadding.x,
          top: appPadding.y,
          bgcolor: 'common.white',
          p: 2,
          borderRadius: 1,
          border: 1,
          minWidth: 200
        }}
      >
        <Typography variant="body2">
          Scroll: {scroll.position.x}, {scroll.position.y}
        </Typography>
        <Typography variant="body2">
          Mouse: {mouse.position.tile.x}, {mouse.position.tile.y}
        </Typography>
      </Box>
    </>
  );
};
