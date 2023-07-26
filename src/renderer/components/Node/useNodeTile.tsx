import { useCallback, useRef } from 'react';
import { Group, Shape } from 'paper';
import gsap from 'gsap';
import { TILE_SIZE, PIXEL_UNIT } from 'src/renderer/utils/constants';
import { applyProjectionMatrix } from 'src/renderer/utils/projection';
import { getColorVariant } from 'src/utils';

export const useNodeTile = () => {
  const containerRef = useRef(new Group());
  const tileRef = useRef<paper.Shape.Rectangle>();
  const highlightRef = useRef<paper.Shape.Rectangle>();

  const updateColor = useCallback((color: string) => {
    if (!tileRef.current || !highlightRef.current) return;

    tileRef.current.set({
      fillColor: color,
      strokeColor: getColorVariant(color, 'dark', { grade: 2 })
    });

    highlightRef.current.set({
      strokeColor: getColorVariant(color, 'dark', { grade: 2 })
    });
  }, []);

  const setActive = useCallback((isActive: boolean) => {
    if (!highlightRef.current) return;

    if (isActive) {
      highlightRef.current.set({ visible: true });

      gsap
        .fromTo(
          highlightRef.current,
          { dashOffset: 0 },
          {
            dashOffset: PIXEL_UNIT * 12,
            duration: 0.25,
            ease: 'none'
          }
        )
        .repeat(-1);
    } else {
      highlightRef.current.set({ visible: false });
      gsap.killTweensOf(highlightRef.current);
    }
  }, []);

  const init = useCallback(() => {
    containerRef.current.removeChildren();
    containerRef.current.set({ pivot: [0, 0] });

    tileRef.current = new Shape.Rectangle({
      strokeCap: 'round',
      size: [TILE_SIZE * 1.2, TILE_SIZE * 1.2],
      radius: PIXEL_UNIT * 8,
      strokeWidth: 1,
      strokeColor: 'black',
      pivot: [0, 0],
      position: [0, 0],
      dashArray: null
    });

    highlightRef.current = tileRef.current.clone().set({
      radius: PIXEL_UNIT * 12,
      strokeWidth: PIXEL_UNIT * 3,
      pivot: [0, 0],
      dashArray: [PIXEL_UNIT * 6, PIXEL_UNIT * 6],
      scaling: 1.2,
      visible: false
    });

    containerRef.current.addChild(highlightRef.current);
    containerRef.current.addChild(tileRef.current);
    applyProjectionMatrix(containerRef.current);

    tileRef.current.position.set(0, 0);
    highlightRef.current.position.set(0, 0);
    tileRef.current.applyMatrix = true;
    highlightRef.current.applyMatrix = true;

    return containerRef.current;
  }, []);

  return {
    init,
    updateColor,
    setActive
  };
};
