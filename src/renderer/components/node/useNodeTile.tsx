import { useCallback, useRef } from 'react';
import { Group, Shape } from 'paper';
import { TILE_SIZE, PIXEL_UNIT } from 'src/renderer/utils/constants';
import { applyProjectionMatrix } from 'src/renderer/utils/projection';

export const useNodeTile = () => {
  const containerRef = useRef(new Group());

  const init = useCallback(() => {
    containerRef.current.removeChildren();
    containerRef.current.set({ pivot: [0, 0] });

    const rectangle = new Shape.Rectangle({
      strokeCap: 'round',
      fillColor: 'blue',
      size: [TILE_SIZE, TILE_SIZE],
      radius: PIXEL_UNIT * 8,
      strokeWidth: 0,
      strokeColor: 'transparent',
      pivot: [0, 0],
      position: [0, 0],
      dashArray: null
    });

    containerRef.current.addChild(rectangle);
    applyProjectionMatrix(containerRef.current);

    rectangle.position.set(0, 0);
    rectangle.scaling.set(1.2);
    rectangle.applyMatrix = true;

    return containerRef.current;
  }, []);

  return {
    init
  };
};
