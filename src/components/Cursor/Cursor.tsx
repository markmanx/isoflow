import React from 'react';
import chroma from 'chroma-js';
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
      fill={chroma(theme.palette.primary.main).alpha(0.5).css()}
      zoom={zoom}
      cornerRadius={10 * zoom}
    />
  );
};
