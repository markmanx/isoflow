import React from 'react';
import { Coords } from 'src/types';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { getColorVariant } from 'src/utils';

interface Props {
  from: Coords;
  to: Coords;
  color: string;
}

export const Rectangle = ({ from, to, color }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });

  return (
    <IsoTileArea
      from={from}
      to={to}
      fill={color}
      cornerRadius={22 * zoom}
      stroke={{
        color: getColorVariant(color, 'dark', { grade: 2 }),
        width: 1 * zoom
      }}
    />
  );
};
