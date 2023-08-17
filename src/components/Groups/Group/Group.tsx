import React from 'react';
import chroma from 'chroma-js';
import { Coords } from 'src/types';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useUiStateStore } from 'src/stores/uiStateStore';

interface Props {
  from: Coords;
  to: Coords;
  color: string;
}

export const Group = ({ from, to, color }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });

  return (
    <IsoTileArea
      from={from}
      to={to}
      fill={chroma(color).alpha(0.6).css()}
      zoom={zoom}
      cornerRadius={22 * zoom}
      stroke={{
        color,
        width: 1 * zoom
      }}
    />
  );
};
