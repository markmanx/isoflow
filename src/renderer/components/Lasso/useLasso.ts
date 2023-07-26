import { useRef, useCallback } from 'react';
import { Group, Shape } from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { TILE_SIZE, PIXEL_UNIT } from 'src/renderer/utils/constants';
import {
  getBoundingBox,
  sortByPosition,
  getTileBounds
} from 'src/renderer/utils/gridHelpers';
import { applyProjectionMatrix } from 'src/renderer/utils/projection';

export const useLasso = () => {
  const containerRef = useRef(new Group());
  const shapeRef = useRef<paper.Shape.Rectangle>();

  const setSelection = useCallback((startTile: Coords, endTile: Coords) => {
    if (!shapeRef.current) return;

    const boundingBox = getBoundingBox([startTile, endTile]);

    // TODO: Enforce at least one node being passed to this getBoundingBox() to prevent null returns
    if (!boundingBox) return;

    const lassoStartTile = boundingBox[3];
    const lassoScreenPosition = getTileBounds(lassoStartTile).left;
    const sorted = sortByPosition(boundingBox);
    const position = new Coords(sorted.lowX, sorted.highY);
    const size = new Coords(
      sorted.highX - sorted.lowX,
      sorted.highY - sorted.lowY
    );

    shapeRef.current.set({
      position,
      size: [
        (size.x + 1) * (TILE_SIZE - PIXEL_UNIT * 3),
        (size.y + 1) * (TILE_SIZE - PIXEL_UNIT * 3)
      ]
    });

    containerRef.current.set({
      pivot: shapeRef.current.bounds.bottomLeft,
      position: lassoScreenPosition
    });
  }, []);

  const init = useCallback(() => {
    containerRef.current.removeChildren();
    containerRef.current.set({ pivot: [0, 0] });

    shapeRef.current = new Shape.Rectangle({
      strokeCap: 'round',
      fillColor: 'lightBlue',
      size: [TILE_SIZE, TILE_SIZE],
      opacity: 0.5,
      radius: PIXEL_UNIT * 8,
      strokeWidth: PIXEL_UNIT * 3,
      strokeColor: 'blue',
      dashArray: [5, 10],
      pivot: [0, 0]
    });

    gsap
      .fromTo(
        shapeRef.current,
        { dashOffset: 0 },
        { dashOffset: PIXEL_UNIT * 10, ease: 'none', duration: 0.25 }
      )
      .repeat(-1);

    containerRef.current.addChild(shapeRef.current);
    applyProjectionMatrix(containerRef.current);

    return containerRef.current;
  }, []);

  return {
    init,
    containerRef,
    setSelection
  };
};
