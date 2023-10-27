import React from 'react';
import { Rectangle as RectangleI } from 'src/types';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { getColorVariant } from 'src/utils';
import { DEFAULT_COLOR } from 'src/config';

type Props = RectangleI;

export const Rectangle = ({ from, to, color = DEFAULT_COLOR }: Props) => {
  return (
    <IsoTileArea
      from={from}
      to={to}
      fill={color}
      cornerRadius={22}
      stroke={{
        color: getColorVariant(color, 'dark', { grade: 2 }),
        width: 1
      }}
    />
  );
};
