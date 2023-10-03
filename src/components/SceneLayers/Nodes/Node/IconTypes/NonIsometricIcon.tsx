import React from 'react';
import { Box } from '@mui/material';
import { Icon } from 'src/types';
import { useTileSize } from 'src/hooks/useTileSize';
import { getIsoProjectionCss } from 'src/utils';

interface Props {
  icon: Icon;
}

export const NonIsometricIcon = ({ icon }: Props) => {
  const { projectedTileSize } = useTileSize();

  return (
    <Box sx={{ pointerEvents: 'none' }}>
      <Box
        sx={{
          position: 'absolute',
          left: -projectedTileSize.width / 2,
          top: -projectedTileSize.height / 2,
          transformOrigin: 'top left',
          transform: getIsoProjectionCss(),
          userSelect: 'none'
        }}
      >
        <Box
          component="img"
          src={icon.url}
          alt={`icon-${icon.id}`}
          sx={{ width: projectedTileSize.width * 0.7 }}
        />
      </Box>
    </Box>
  );
};
