import React, { forwardRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { getIsoMatrixCSS, getTranslateCSS } from 'src/utils';

interface Props {
  size: number;
  fill: string;
  cornerRadius?: number;
  stroke?: {
    width: number;
    color: string;
  };
}

export const IsoTile = forwardRef(
  ({ size, fill, cornerRadius = 0, stroke }: Props, ref) => {
    const strokeParams = useMemo(() => {
      if (!stroke) return {};

      return {
        stroke: stroke.color,
        strokeWidth: stroke.width,
        strokeAlignment: 'center',
        strokeLineJoin: 'round',
        strokeLineCap: 'round'
      };
    }, [stroke]);

    const viewboxOffset = useMemo(() => {
      return stroke?.width ?? 0;
    }, [stroke?.width]);

    return (
      <Box
        ref={ref}
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`${-viewboxOffset}, ${-viewboxOffset}, ${
          size + viewboxOffset * 2
        }, ${size + viewboxOffset * 2}`}
        sx={{
          position: 'absolute',
          transform: `${getTranslateCSS({
            x: -(size / 2),
            y: -(size / 2)
          })} ${getIsoMatrixCSS()}`
        }}
        width={size}
        height={size}
      >
        <rect
          width={size}
          height={size}
          fill={fill}
          rx={cornerRadius}
          {...strokeParams}
        />
      </Box>
    );
  }
);
