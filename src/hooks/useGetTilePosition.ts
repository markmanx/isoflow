import { useCallback } from 'react';
import { Coords, TileOriginEnum } from 'src/types';
import { getTilePosition as getTilePositionUtil } from 'src/utils';

export const useGetTilePosition = () => {
  const getTilePosition = useCallback(
    ({ tile, origin }: { tile: Coords; origin?: TileOriginEnum }) => {
      return getTilePositionUtil({
        tile,
        origin
      });
    },
    []
  );

  return { getTilePosition };
};
