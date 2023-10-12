import { useCallback } from 'react';
import { CoordsUtils, getTilePosition } from 'src/utils';
import { Coords, TileOriginEnum } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';

export const useScroll = () => {
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const rendererSize = useUiStateStore((state) => {
    return state.rendererSize;
  });

  const scrollToTile = useCallback(
    (tile: Coords, origin?: TileOriginEnum) => {
      const tilePosition = getTilePosition({ tile, origin });
      const scrollTo: Coords = {
        x: scroll.position.x - tilePosition.x + rendererSize.width / 2,
        y: scroll.position.y - tilePosition.y + rendererSize.height / 2
      };

      uiStateActions.setScroll({
        offset: CoordsUtils.zero(),
        position: scrollTo
      });
    },
    [scroll.position, uiStateActions, rendererSize]
  );

  return {
    scroll,
    scrollToTile
  };
};
