import { useMemo, Ref } from 'react';
import Paper from 'paper';
import { PROJECTED_TILE_DIMENSIONS } from './constants';
import { useAppState } from './useAppState';
import { Coords } from '../../utils/Coords';

export const useGetTileFromMouse = (mainContainer: paper.Group) => {
  const mouse = useAppState((state) => state.mouse);
  const scroll = useAppState((state) => state.scroll);

  const tile = useMemo(() => {
    const halfW = PROJECTED_TILE_DIMENSIONS.x / 2;
    const halfH = PROJECTED_TILE_DIMENSIONS.y / 2;

    const canvasPosition = new Coords(
      mouse.position.x - mainContainer.position.x,
      mouse.position.y - mainContainer.position.y + halfH,
    );

    const row = Math.floor(
      (canvasPosition.x / halfW + canvasPosition.y / halfH) / 2,
    );
    const col = Math.floor(
      (canvasPosition.y / halfH - canvasPosition.x / halfW) / 2,
    );

    const halfRowNum = Math.floor(this.sceneElements.grid.size.x * 0.5);
    const halfColNum = Math.floor(this.sceneElements.grid.size.y * 0.5);

    return new Coords(
      clamp(row, -halfRowNum, halfRowNum),
      clamp(col, -halfColNum, halfColNum),
    );
  }, [mouse, scroll]);

  return {
    tile,
  };
};
