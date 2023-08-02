import React from 'react';
import { Box } from '@mui/material';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { getTilePosition } from 'src/utils';
import { TileOriginEnum } from 'src/types';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { TILE_SIZE } from 'src/config';
import { Grid } from 'src/components/Grid/Grid';
import { Cursor } from 'src/components/Cursor/Cursor';
import { Node } from 'src/components/Node/Node';

export const Renderer = () => {
  const scene = useSceneStore(({ nodes, connectors, groups }) => {
    return { nodes, connectors, groups };
  });
  const icons = useSceneStore((state) => {
    return state.icons;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
  });
  useInteractionManager();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%'
      }}
    >
      <Grid tileSize={TILE_SIZE * zoom} />
      {mode.showCursor && <Cursor tile={mouse.position.tile} zoom={zoom} />}
      {scene.nodes.map((node) => {
        return (
          <Node
            key={node.id}
            node={node}
            iconUrl={
              icons.find((icon) => {
                return icon.id === node.iconId;
              })?.url
            }
            zoom={zoom}
          />
        );
      })}
    </Box>
  );
};
