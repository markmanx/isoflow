import React from 'react';
import { Box } from '@mui/material';
import { PROJECTED_TILE_DIMENSIONS } from 'src/renderer/utils/constants';

interface Props {
  iconUrl?: string;
  position: { x: number; y: number };
}

export const NodeV2 = ({ iconUrl, position }: Props) => {
  if (!iconUrl) return null;

  return (
    <Box
      component="img"
      src={iconUrl}
      sx={{
        position: 'absolute',
        left: position.x - PROJECTED_TILE_DIMENSIONS.x / 2,
        bottom: position.y - PROJECTED_TILE_DIMENSIONS.y / 2,
        width: PROJECTED_TILE_DIMENSIONS.x,
        pointerEvents: 'none'
      }}
    />
  );
};
