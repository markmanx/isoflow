import { useEffect, useRef, useCallback } from 'react';
import { Group, Raster } from 'paper';
import { useAppState } from './useAppState';
import { PROJECTED_TILE_DIMENSIONS } from './constants';

const NODE_IMG_PADDING = 0;

export const useNodeIcon = (iconId: string) => {
  const container = useRef<paper.Group>();
  const icons = useAppState((state) => state.scene.icons);

  useEffect(() => {
    const updateIcon = async () => {
      const icon = icons.find((_icon) => _icon.id === iconId);

      if (!icon) {
        return;
      }

      const iconRaster = new Raster();

      await new Promise((resolve) => {
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
    };

    updateIcon();
  }, [iconId, icons]);

  const init = useCallback(() => {
    container.current = new Group();
  }, []);

  return {
    container: container.current,
    init,
  };
};
