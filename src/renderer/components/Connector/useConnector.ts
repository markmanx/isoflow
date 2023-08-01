import { useCallback, useRef } from 'react';
import { Group, Path } from 'paper';
import { pathfinder } from 'src/utils/pathfinder';
import { Coords, TileOriginEnum } from 'src/types';
import { getTilePosition } from 'src/utils';

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
        return getTilePosition(tile, TileOriginEnum.CENTER);
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
