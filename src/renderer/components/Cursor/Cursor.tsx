import React from 'react';
import { Box, useTheme } from '@mui/material';
import { PROJECTED_TILE_DIMENSIONS } from 'src/renderer/utils/constants';
import { getCSSMatrix } from 'src/renderer/utils/projection';

interface Props {
  position: { x: number; y: number };
  tileSize: number;
}

export const Cursor = ({ position, tileSize }: Props) => {
  const theme = useTheme();

  // return (
  //   <svg
  //     style={{
  //       position: 'absolute',
  //       left: position.x,
  //       top: position.y
  //     }}
  //     width={tileSize}
  //     height={tileSize}
  //     transform={`translate(
  //       ${-tileSize * 0.5}, ${-tileSize * 0.5})`}
  //   >
  //     <rect width={tileSize} height={tileSize} fill="red" />
  //   </svg>
  // );

  return (
    <Box
      component="svg"
      sx={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `translate(${-tileSize * 0.5}px, ${
          -tileSize * 0.5
        }px) ${getCSSMatrix()}`
      }}
      width={tileSize}
      height={tileSize}
    >
      <rect
        width={tileSize}
        height={tileSize}
        fill={theme.palette.primary.main}
        opacity={0.5}
      />
    </Box>
  );
};
