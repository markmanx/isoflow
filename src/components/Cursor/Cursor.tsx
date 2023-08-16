import React from 'react';
import { useTheme } from '@mui/material';
import { Coords } from 'src/types';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useUiStateStore } from 'src/stores/uiStateStore';

interface Props {
  tile: Coords;
}

export const Cursor = ({ tile }: Props) => {
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
