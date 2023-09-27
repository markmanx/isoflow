import React from 'react';
import { Box } from '@mui/material';
import { IconComponent as IconComponentI } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useTileSize } from 'src/hooks/useTileSize';

interface Props {
  IconComponent: IconComponentI;
}

export const NodeComponentIcon = ({ IconComponent }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const { projectedTileSize } = useTileSize();

  return (
    <Box sx={{ pointerEvents: 'none' }}>
      <IconComponent zoom={zoom} projectedTileSize={projectedTileSize} />
    </Box>
  );
};
