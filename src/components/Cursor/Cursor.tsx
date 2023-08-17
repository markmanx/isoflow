import React from 'react';
import { useTheme } from '@mui/material';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useUiStateStore } from 'src/stores/uiStateStore';

export const Cursor = () => {
  const tile = useUiStateStore((state) => {
    return state.mouse.position.tile;
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const theme = useTheme();

  return (
    <IsoTileArea
      from={tile}
      to={tile}
      fill={theme.palette.primary.main}
      zoom={zoom}
      cornerRadius={10 * zoom}
    />
  );
};
