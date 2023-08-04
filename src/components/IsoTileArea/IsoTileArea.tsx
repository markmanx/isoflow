import React, { forwardRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import { Size, Coords } from 'src/types';
import { getIsoMatrixCSS, getProjectedTileSize } from 'src/utils';

interface Props {
  tileArea: Size;
  fill: string;
  cornerRadius?: number;
  stroke?: {
    width: number;
    color: string;
  };
  zoom: number;
}

export const IsoTileArea = forwardRef(
  ({ tileArea, fill, cornerRadius = 0, stroke, zoom }: Props, ref) => {
    const projectedTileSize = useMemo(() => {
      return getProjectedTileSize({ zoom });
    }, [zoom]);

    const viewbox = useMemo<Size>(() => {
      return {
        width:
          (tileArea.width / 2 + tileArea.height / 2) * projectedTileSize.width,
        height:
          (tileArea.width / 2 + tileArea.height / 2) * projectedTileSize.height
      };
    }, [tileArea, projectedTileSize]);

    const translate = useMemo<Coords>(() => {
      return { x: tileArea.width * (projectedTileSize.width / 2), y: 0 };
    }, [tileArea, projectedTileSize, zoom]);

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

    const marginLeft = useMemo(() => {
      return -(tileArea.width * projectedTileSize.width * 0.5);
    }, [projectedTileSize.width, tileArea.width, zoom]);

    return (
      <Box
        ref={ref}
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${viewbox.width} ${viewbox.height}`}
        sx={{
          position: 'absolute',
          marginLeft: `${marginLeft}px`
        }}
        width={`${viewbox.width}px`}
        height={`${viewbox.height}px`}
      >
        <g transform={`translate(${translate.x}, ${translate.y})`}>
          <g transform={getIsoMatrixCSS()}>
            <rect
              width={tileArea.width * UNPROJECTED_TILE_SIZE * zoom}
              height={tileArea.height * UNPROJECTED_TILE_SIZE * zoom}
              fill={fill}
              rx={cornerRadius}
              {...strokeParams}
            />
          </g>
        </g>
      </Box>
    );
  }
);
