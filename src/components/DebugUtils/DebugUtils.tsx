import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useSceneStore } from 'src/stores/sceneStore';
import { LineItem } from './LineItem';

export const DebugUtils = () => {
  const {
    customVars: { appPadding }
  } = useTheme();
  const uiState = useUiStateStore(
    ({ scroll, mouse, zoom, rendererSize, mode }) => {
      return { scroll, mouse, zoom, rendererSize, mode };
    }
  );
  const scene = useSceneStore((state) => {
    return state;
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: 'common.white',
        px: 2,
        py: 1
      }}
    >
      <LineItem
        title="Mouse"
        value={`${uiState.mouse.position.tile.x}, ${uiState.mouse.position.tile.y}`}
      />
      <LineItem
        title="Mouse down"
        value={
          uiState.mouse.mousedown
            ? `${uiState.mouse.mousedown.tile.x}, ${uiState.mouse.mousedown.tile.y}`
            : 'null'
        }
      />
      <LineItem
        title="Mouse delta"
        value={
          uiState.mouse.delta
            ? `${uiState.mouse.delta.tile.x}, ${uiState.mouse.delta.tile.y}`
            : 'null'
        }
      />
      <LineItem
        title="Scroll"
        value={`${uiState.scroll.position.x}, ${uiState.scroll.position.y}`}
      />
      <LineItem title="Zoom" value={uiState.zoom} />
      <LineItem
        title="Size"
        value={`${uiState.rendererSize.width}, ${uiState.rendererSize.height}`}
      />
      <LineItem title="Scene info" value={`${scene.nodes.length} nodes`} />
      <LineItem title="Mode" value={uiState.mode.type} />
      <LineItem title="Mode data" value={JSON.stringify(uiState.mode)} />
    </Box>
  );
};
