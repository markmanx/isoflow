import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { SizeIndicator } from './SizeIndicator';
import { Value } from './Value';
import { LineItem } from './LineItem';

export const DebugUtils = () => {
  const {
    customVars: { appPadding }
  } = useTheme();
  const uiState = useUiStateStore(({ scroll, mouse, zoom, rendererSize }) => {
    return { scroll, mouse, zoom, rendererSize };
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });

  const { scroll, mouse, zoom, rendererSize } = uiState;

  return (
    <>
      <SizeIndicator />
      <Box
        sx={{
          position: 'absolute',
          left: appPadding.x,
          bottom: appPadding.y,
          bgcolor: 'common.white',
          width: 350,
          borderRadius: 1,
          border: (theme) => {
            return `1px solid ${theme.palette.grey[400]}`;
          },
          px: 2,
          py: 1
        }}
      >
        <LineItem
          title="Mouse"
          value={`${mouse.position.tile.x}, ${mouse.position.tile.y}`}
        />
        <LineItem
          title="Scroll"
          value={`${scroll.position.x}, ${scroll.position.y}`}
        />
        <LineItem title="Zoom" value={zoom} />
        <LineItem
          title="Size"
          value={`${rendererSize.width}, ${rendererSize.height}`}
        />
        <LineItem title="Mode" value={mode.type} />
        <LineItem title="Mode data" value={JSON.stringify(mode)} />
      </Box>
    </>
  );
};
