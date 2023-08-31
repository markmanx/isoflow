import { useMemo } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { getProjectedTileSize } from 'src/utils';
import { UNPROJECTED_TILE_SIZE } from 'src/config';

export const useTileSize = () => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });

  const projectedTileSize = useMemo(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  const unprojectedTileSize = useMemo(() => {
    return UNPROJECTED_TILE_SIZE * zoom;
  }, [zoom]);

  return { projectedTileSize, unprojectedTileSize };
};
