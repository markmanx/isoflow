import React from 'react';
import { Box } from '@mui/material';
import { getCSSMatrix } from 'src/renderer/utils/projection';
import { getProjectedTileSize } from 'src/renderer/utils/constants';
import { useWindowSize } from 'src/hooks/useWindowSize';

interface Props {
  tileSize: number;
  scroll: { x: number; y: number };
}

export const Grid = ({ tileSize, scroll }: Props) => {
  const windowSize = useWindowSize();
  const projectedTileSize = getProjectedTileSize(tileSize);

  return (
    <Box
      sx={{
        width: '300%',
        height: '300%',
        left: '-100%',
        top: '-100%',
        position: 'absolute',
        pointerEvents: 'none',
        transform: `${getCSSMatrix()} translateZ(0)`
      }}
    >
      <Box component="svg" width="100%" height="100%">
        {/* <pattern
          id="dotpattern"
          x={`calc(50% - ${tileSize * 0.5}px - 2px)`}
          y={`calc(50% - ${tileSize * 0.5}px - 2px)`}
          width={tileSize}
          height={tileSize}
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r={2} fill="rgba(0, 0, 0, 0.3)" />
        </pattern> */}
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
        <rect x="0" y="0" width="100%" height="100%" fill="url(#gridpattern)" />
      </Box>
    </Box>
  );
};
