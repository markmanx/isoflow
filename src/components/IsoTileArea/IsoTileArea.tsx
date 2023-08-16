import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import { Size, Coords, TileOriginEnum } from 'src/types';
import {
  getIsoMatrixCSS,
  getProjectedTileSize,
  getBoundingBox
} from 'src/utils';
import { Svg } from 'src/components/Svg/Svg';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';

interface Props {
  from: Coords;
  to: Coords;
  origin?: Coords;
  fill: string;
  cornerRadius?: number;
  stroke?: {
    width: number;
    color: string;
  };
  zoom: number;
  children?: React.ReactNode;
}

export const IsoTileArea = ({
  from,
  to,
  origin: _origin,
  fill,
  cornerRadius = 0,
  stroke,
  zoom,
  children
}: Props) => {
  const { getTilePosition } = useGetTilePosition();
  const projectedTileSize = useMemo(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  const size = useMemo(() => {
    return {
      width: Math.abs(from.x - to.x) + 1,
      height: Math.abs(from.y - to.y) + 1
    };
  }, [from, to]);

  const origin = useMemo(() => {
    if (_origin) return _origin;

    const boundingBox = getBoundingBox([from, to]);

    return boundingBox[2];
  }, [from, to, _origin]);

  const position = useMemo(() => {
    return getTilePosition({
      tile: origin,
      origin: TileOriginEnum.TOP
    });
  }, [origin, getTilePosition]);

  const viewbox = useMemo<Size>(() => {
    return {
      width: (size.width / 2 + size.height / 2) * projectedTileSize.width,
      height: (size.width / 2 + size.height / 2) * projectedTileSize.height
    };
  }, [size, projectedTileSize]);

  const translate = useMemo<Coords>(() => {
    return { x: size.width * (projectedTileSize.width / 2), y: 0 };
  }, [size, projectedTileSize]);

  const strokeParams = useMemo(() => {
    if (!stroke) return {};

    return {
      stroke: stroke.color,
      strokeWidth: stroke.width
    };
  }, [stroke]);

  const marginLeft = useMemo(() => {
    return -(size.width * projectedTileSize.width * 0.5);
  }, [projectedTileSize.width, size.width]);

  return (
    <Box
      sx={{
        position: 'absolute',
        marginLeft: `${marginLeft}px`,
        left: position.x,
        top: position.y
      }}
    >
      <Svg
        viewBox={`0 0 ${viewbox.width} ${viewbox.height}`}
        width={`${viewbox.width}px`}
        height={`${viewbox.height}px`}
      >
        <g transform={`translate(${translate.x}, ${translate.y})`}>
          <g transform={getIsoMatrixCSS()}>
            <rect
              width={size.width * UNPROJECTED_TILE_SIZE * zoom}
              height={size.height * UNPROJECTED_TILE_SIZE * zoom}
              fill={fill}
              rx={cornerRadius}
              {...strokeParams}
            />
            {children}
          </g>
        </g>
      </Svg>
    </Box>
  );
};
