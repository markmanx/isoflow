import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import gridTileSvg from 'src/assets/grid-tile-bg.svg';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { SizeUtils } from 'src/utils/SizeUtils';

export const Grid = () => {
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const projectedTileSize = useMemo(() => {
    return SizeUtils.multiply(PROJECTED_TILE_SIZE, zoom);
  }, [zoom]);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
        style={{
          background: `repeat url("${gridTileSvg}")`,
          backgroundSize: `${projectedTileSize.width}px`,
          backgroundPosition: `calc(50% + ${
            scroll.position.x % projectedTileSize.width
          }px) calc(50% + ${scroll.position.y % projectedTileSize.height}px)`
        }}
      />
    </Box>
  );
};
