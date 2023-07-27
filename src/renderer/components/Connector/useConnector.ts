import { useCallback, useRef } from 'react';
import { Group, Path } from 'paper';
import { pathfinder } from 'src/renderer/utils/pathfinder';
import { Coords } from 'src/utils/Coords';
import { getTileBounds } from 'src/renderer/utils/gridHelpers';

export const useConnector = () => {
  const containerRef = useRef(new Group());
  const pathRef = useRef<paper.Path>();

  const updateColor = useCallback((color: string) => {
    if (!pathRef.current) return;

    pathRef.current.set({
      strokeColor: color
    });
  }, []);

  const updateFromTo = useCallback(
    (gridSize: Coords, from: Coords, to: Coords) => {
      if (!pathRef.current) return;

      const { findPath } = pathfinder(gridSize);
      const path = findPath([from, to]);

      const points = path.map((tile) => {
        return getTileBounds(tile).center;
      });

      pathRef.current.set({
        segments: points
      });
    },
    []
  );

  const init = useCallback(() => {
    containerRef.current.removeChildren();

    pathRef.current = new Path({
      strokeWidth: 5
    });

    containerRef.current.addChild(pathRef.current);

    return containerRef.current;
  }, []);

  return {
    init,
    updateColor,
    updateFromTo
  };
};
