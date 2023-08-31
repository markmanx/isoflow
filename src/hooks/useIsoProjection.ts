import { useMemo } from 'react';
import {
  Coords,
  TileOriginEnum,
  Size,
  ProjectionOrientationEnum
} from 'src/types';
import { getBoundingBox, getIsoMatrixCSS } from 'src/utils';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useGetTilePosition } from './useGetTilePosition';

interface Props {
  from: Coords;
  to: Coords;
  originOverride?: Coords;
  orientation?: ProjectionOrientationEnum;
}

export const useIsoProjection = ({
  from,
  to,
  originOverride,
  orientation
}: Props): {
  css: React.CSSProperties;
  position: Coords;
  gridSize: Size;
  pxSize: Size;
} => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const { getTilePosition } = useGetTilePosition();

  const gridSize = useMemo(() => {
    return {
      width: Math.abs(from.x - to.x) + 1,
      height: Math.abs(from.y - to.y) + 1
    };
  }, [from, to]);

  const origin = useMemo(() => {
    if (originOverride) return originOverride;

    const boundingBox = getBoundingBox([from, to]);

    return boundingBox[3];
  }, [from, to, originOverride]);

  const position = useMemo(() => {
    const pos = getTilePosition({
      tile: origin,
      origin: orientation === 'Y' ? TileOriginEnum.TOP : TileOriginEnum.LEFT
    });

    return pos;
  }, [origin, getTilePosition, orientation]);

  const pxSize = useMemo(() => {
    return {
      width: gridSize.width * UNPROJECTED_TILE_SIZE * zoom,
      height: gridSize.height * UNPROJECTED_TILE_SIZE * zoom
    };
  }, [zoom, gridSize]);

  return {
    css: {
      position: 'absolute',
      left: position.x,
      top: position.y,
      width: `${pxSize.width}px`,
      height: `${pxSize.height}px`,
      transform: getIsoMatrixCSS(orientation),
      transformOrigin: 'top left'
    },
    position,
    gridSize,
    pxSize
  };
};
