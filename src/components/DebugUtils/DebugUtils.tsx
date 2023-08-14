import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { SizeIndicator } from './SizeIndicator';

export const DebugUtils = () => {
  const {
    customVars: { appPadding }
  } = useTheme();
  const uiState = useUiStateStore(({ scroll, mouse, zoom, rendererSize }) => {
    return { scroll, mouse, zoom, rendererSize };
  });

  const { scroll, mouse, zoom, rendererSize } = uiState;

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
        <Typography variant="body2">Zoom: {zoom}</Typography>
        <Typography variant="body2">
          Renderer size: {rendererSize.width} {rendererSize.height}
        </Typography>
      </Box>
    </>
  );
};
