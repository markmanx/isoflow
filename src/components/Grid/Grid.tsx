import React, { useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import gridTileSvg from 'src/assets/grid-tile-bg.svg';
import { Scroll } from 'src/types';
import { getProjectedTileSize } from 'src/utils';

interface Props {
  scroll: Scroll;
  zoom: number;
}

export const Grid = ({ zoom, scroll }: Props) => {
  const containerRef = useRef<HTMLDivElement>();
  const projectedTileSize = useMemo(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  return (
    <Box
      ref={containerRef}
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
          height: '100%',
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
