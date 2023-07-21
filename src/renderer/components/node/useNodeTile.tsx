import { useCallback, useRef } from 'react';
import { Group, Shape } from 'paper';
import { TILE_SIZE, PIXEL_UNIT } from 'src/renderer/utils/constants';
import { applyProjectionMatrix } from 'src/renderer/utils/projection';
import { getColorVariant } from 'src/utils';

export const useNodeTile = () => {
  const containerRef = useRef(new Group());
  const shapeRef = useRef<paper.Shape.Rectangle>();

  const updateColor = useCallback((color: string) => {
    if (!shapeRef.current) return;

    shapeRef.current.set({
      fillColor: color,
      strokeColor: getColorVariant(color, 'dark', 2)
    });
  }, []);

  const init = useCallback(() => {
    containerRef.current.removeChildren();
    containerRef.current.set({ pivot: [0, 0] });

    shapeRef.current = new Shape.Rectangle({
      strokeCap: 'round',
      size: [TILE_SIZE, TILE_SIZE],
      radius: PIXEL_UNIT * 8,
      strokeWidth: 1,
      pivot: [0, 0],
      position: [0, 0],
      dashArray: null
    });

    containerRef.current.addChild(shapeRef.current);
    applyProjectionMatrix(containerRef.current);

    shapeRef.current.position.set(0, 0);
    shapeRef.current.scaling.set(1.2);
    shapeRef.current.applyMatrix = true;

    return containerRef.current;
  }, []);

  return {
    init,
    updateColor
  };
};
