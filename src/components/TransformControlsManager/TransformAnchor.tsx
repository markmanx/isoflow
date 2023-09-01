import React from 'react';
import { Coords } from 'src/types';
import { useTheme } from '@mui/material';
import { getIsoProjectionCss } from 'src/utils';
import { Svg } from 'src/components/Svg/Svg';
import { TRANSFORM_ANCHOR_SIZE, TRANSFORM_CONTROLS_COLOR } from 'src/config';

interface Props {
  position: Coords;
}

const strokeWidth = 2;

export const TransformAnchor = ({ position }: Props) => {
  const theme = useTheme();

  return (
    <Svg
      style={{
        position: 'absolute',
        left: position.x - TRANSFORM_ANCHOR_SIZE / 2,
        top: position.y - TRANSFORM_ANCHOR_SIZE / 2,
        transform: getIsoProjectionCss(),
        width: TRANSFORM_ANCHOR_SIZE,
        height: TRANSFORM_ANCHOR_SIZE
      }}
    >
      <g transform={`translate(${strokeWidth}, ${strokeWidth})`}>
        <rect
          fill={theme.palette.common.white}
          width={TRANSFORM_ANCHOR_SIZE - strokeWidth * 2}
          height={TRANSFORM_ANCHOR_SIZE - strokeWidth * 2}
          stroke={TRANSFORM_CONTROLS_COLOR}
          strokeWidth={strokeWidth}
          rx={3}
        />
      </g>
    </Svg>
  );
};
