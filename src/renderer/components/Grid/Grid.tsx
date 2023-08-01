import React from 'react';
import { Box } from '@mui/material';
import { getIsoMatrixCSS } from 'src/utils';
import { useWindowSize } from 'src/hooks/useWindowSize';

interface Props {
  tileSize: number;
}

export const Grid = ({ tileSize: _tileSize }: Props) => {
  const windowSize = useWindowSize();
  const tileSize = _tileSize;

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
          width: '300%',
          height: '300%',
          left: '-100%',
          top: '-100%',
          transform: getIsoMatrixCSS()
        }}
      >
        <Box component="svg" width="100%" height="100%">
          <pattern
            id="gridpattern"
            x={`${windowSize.width * 1.5 - tileSize * 0.5}px`}
            y={`${windowSize.height * 1.5 - tileSize * 0.5}px`}
            width={tileSize}
            height={tileSize}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width={tileSize}
              height={tileSize}
              strokeWidth={1}
              stroke="rgba(0, 0, 0, 0.3)"
              fill="none"
            />
          </pattern>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#gridpattern)"
          />
        </Box>
      </Box>
    </Box>
  );
};
