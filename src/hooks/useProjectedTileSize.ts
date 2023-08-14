import { useMemo } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { getProjectedTileSize } from 'src/utils';

export const useProjectedTileSize = () => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });

  const projectedTileSize = useMemo(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  return projectedTileSize;
};
