import PF from 'pathfinding';
import { Coords } from 'src/types';

// TODO1: This file is a mess, refactor it
// TODO: Have one single place for utils
export const pathfinder = (gridSize: Coords) => {
  const grid = new PF.Grid(gridSize.x, gridSize.y);
  const finder = new PF.AStarFinder({
    heuristic: PF.Heuristic.manhattan,
    diagonalMovement: PF.DiagonalMovement.Always
  });

  const convertToGridXY = ({ x, y }: Coords): Coords => {
    return {
      x: x + Math.floor(gridSize.x * 0.5),
      y: y + Math.floor(gridSize.y * 0.5)
    };
  };

  const convertToSceneXY = ({ x, y }: Coords): Coords => {
    return {
      x: x - Math.floor(gridSize.x * 0.5),
      y: y - Math.floor(gridSize.y * 0.5)
    };
  };

  const setWalkableAt = (coords: Coords, isWalkable: boolean) => {
    const { x, y } = convertToGridXY(coords);
    grid.setWalkableAt(x, y, isWalkable);
  };

  const findPath = (tiles: Coords[]): Coords[] => {
    const normalisedRoute = tiles.map((tile) => {
      return convertToGridXY(tile);
    });

    const path = normalisedRoute.reduce((acc, stop, i) => {
      if (i === 0) {
        return acc;
      }

      const workingGrid = grid.clone();
      workingGrid.setWalkableAt(stop.x, stop.y, true);

      const prevStop = normalisedRoute[i - 1];

      const segment = finder.findPath(
        prevStop.x,
        prevStop.y,
        stop.x,
        stop.y,
        workingGrid
      );

      return [...acc, ...(i > 1 ? segment.slice(1) : segment)];
    }, [] as number[][]);

    return path.map((tile) => {
      return convertToSceneXY({ x: tile[0], y: tile[1] });
    });
  };

  return {
    setWalkableAt,
    findPath
  };
};
