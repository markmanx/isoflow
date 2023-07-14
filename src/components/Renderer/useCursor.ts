import { useRef, useCallback } from 'react';
import { Group, Shape } from 'paper';
import gsap from 'gsap';
import { TILE_SIZE, PIXEL_UNIT } from './constants';
import { applyProjectionMatrix } from './utils/projection';
import { Coords } from '../../utils/Coords';

export const useCursor = () => {
  const container = useRef(new Group());

  const init = useCallback(() => {
    container.current.removeChildren();

    const rectangle = new Shape.Rectangle({
      strokeCap: 'round',
      fillColor: 'blue',
      size: [TILE_SIZE, TILE_SIZE],
      opacity: 0.5,
      radius: PIXEL_UNIT * 8,
      strokeWidth: 0,
      strokeColor: 'transparent',
      pivot: [0, 0],
      dashArray: null,
    });

    container.current.addChild(rectangle);
    applyProjectionMatrix(container.current);

    return container.current;
  }, []);

  const moveTo = useCallback((position: Coords) => {
    gsap.to(container.current.position, {
      duration: 0.1,
      ...position,
    });
  }, []);

  return {
    init,
    moveTo,
  };
};
