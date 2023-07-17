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
    container.current.set({ pivot: [0, 0] });

    const rectangle = new Shape.Rectangle({
      strokeCap: 'round',
      fillColor: 'blue',
      size: [TILE_SIZE, TILE_SIZE],
      opacity: 0.5,
      radius: PIXEL_UNIT * 8,
      strokeWidth: 0,
      strokeColor: 'transparent',
      pivot: [0, 0],
      position: [0, 0],
      dashArray: null
    });

    container.current.addChild(rectangle);
    applyProjectionMatrix(container.current);

    return container.current;
  }, []);

  const moveTo = useCallback(
    (position: Coords, opts?: { animationDuration?: number }) => {
      // For some reason, gsap doesn't like to tween x and y both to 0, so we clamp to just above 0.
      const clampedPosition = new Coords(
        position.x === 0 ? 0.000001 : position.x,
        position.y === 0 ? 0.000001 : position.y
      );

      gsap.to(container.current.position, {
        duration: opts?.animationDuration || 0.1,
        ...clampedPosition
      });
    },
    []
  );

  const setVisible = useCallback((state: boolean) => {
    container.current.visible = state;
  }, []);

  return {
    init,
    moveTo,
    setVisible
  };
};
