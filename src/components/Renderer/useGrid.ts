import {
  useCallback, useRef,
} from 'react';
import { Path, Point, Group } from 'paper';
import { applyProjectionMatrix } from './utils/projection';
import { TILE_SIZE, PIXEL_UNIT, SCALING_CONST } from './constants';
import { useAppState } from './useAppState';

export const drawGrid = (width: number, height: number) => {
  const container = new Group();

  for (let x = 0; x <= width; x += 1) {
    const lineLength = height * TILE_SIZE;
    const start = x * TILE_SIZE - lineLength * 0.5;
    const line = new Path({
      segments: [
        [start, -lineLength * 0.5],
        [start, lineLength * 0.5],
      ],
      strokeWidth: PIXEL_UNIT * 1,
      strokeColor: 'rgba(0, 0, 0, 0.15)',
    });

    container.addChild(line);
  }

  for (let y = 0; y <= height; y += 1) {
    const lineLength = width * TILE_SIZE;
    const start = y * TILE_SIZE - lineLength * 0.5;
    const line = new Path({
      segments: [
        [-lineLength * 0.5, start],
        [lineLength * 0.5, start],
      ],
      strokeWidth: PIXEL_UNIT * 1,
      strokeColor: 'rgba(0, 0, 0, 0.15)',
    });

    container.addChild(line);
  }

  container.scaling = new Point(SCALING_CONST, SCALING_CONST);
  applyProjectionMatrix(container);

  return container;
};

export const useGrid = () => {
  const container = useRef(new Group());
  const gridSize = useAppState((state) => state.gridSize);

  const init = useCallback(() => {
    container.current.removeChildren();
    const grid = drawGrid(gridSize.x, gridSize.y);
    container.current.addChild(grid);

    return container.current;
  }, [gridSize]);

  return {
    init,
    container: container.current,
  };
};
