import { useEffect, useRef } from "react";
import { Group, Raster } from "paper";
import { useAppState } from "./useAppState";
import { PROJECTED_TILE_DIMENSIONS } from "./constants";

const NODE_IMG_PADDING = 0;

export const useNodeIcon = (iconId: string) => {
  const container = useRef(new Group());
  const icons = useAppState((state) => state.initialScene.icons);

  useEffect(() => {
    console.log(icons);

    const updateIcon = async () => {
      const icon = icons.find((icon) => icon.id === iconId);

      if (!icon) {
        return;
      }

      const iconRaster = new Raster();

      await new Promise((resolve) => {
        iconRaster.onLoad = () => {
          iconRaster.scale(
            (PROJECTED_TILE_DIMENSIONS.x - NODE_IMG_PADDING) /
              iconRaster.bounds.width
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

  return {
    container: container.current,
  };
};
