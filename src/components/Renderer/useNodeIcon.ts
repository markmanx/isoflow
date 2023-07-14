import { useRef, useCallback } from 'react';
import { Group, Raster } from 'paper';
import { useAppState } from './useAppState';
import { PROJECTED_TILE_DIMENSIONS } from './constants';

const NODE_IMG_PADDING = 0;

export const useNodeIcon = () => {
  const container = useRef(new Group());
  const icons = useAppState((state) => state.scene.icons);

  const update = useCallback(async (iconId: string) => {
    const icon = icons.find((_icon) => _icon.id === iconId);

    if (!icon) return;

    await new Promise((resolve) => {
      const iconRaster = new Raster();

      iconRaster.onLoad = () => {
        if (!container.current) return;

        iconRaster.scale(
          (PROJECTED_TILE_DIMENSIONS.x - NODE_IMG_PADDING)
              / iconRaster.bounds.width,
        );

        const raster = iconRaster.rasterize();

        container.current.removeChildren();
        container.current.addChild(raster);
        container.current.pivot = iconRaster.bounds.bottomCenter;

        resolve(null);
      };

      iconRaster.source = icon.url;
    });
  }, [icons]);

  const init = useCallback(() => {
    container.current.removeChildren();
    container.current = new Group();

    return container.current;
  }, []);

  return {
    container: container.current,
    update,
    init,
  };
};
