import React from 'react';
import { Box } from '@mui/material';
import { getCSSMatrix } from 'src/renderer/utils/projection';

interface Props {
  tileSize: number;
  scroll: { x: number; y: number };
}

export const Grid = ({ tileSize, scroll }: Props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none'
      }}
    >
      <svg width="100%" height="100%">
        <pattern
          id="gridpattern"
          width={tileSize}
          height={tileSize}
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(${scroll.x},${
            scroll.y
          }) ${getCSSMatrix()}`}
        >
          <circle cx={2} cy={2} r={2} fill="red" />
        </pattern>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gridpattern)" />
      </svg>
    </Box>
  );
};
