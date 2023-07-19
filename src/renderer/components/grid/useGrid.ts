import { useCallback, useRef } from 'react';
import { Path, Point, Group } from 'paper';
import { applyProjectionMatrix } from '../../utils/projection';
import { TILE_SIZE, PIXEL_UNIT, SCALING_CONST } from '../utils/constants';
import { useAppState } from '../../useAppState';

const LINE_STYLE = {
  color: 'rgba(0, 0, 0, 0.15)',
  width: PIXEL_UNIT * 1
};

export const drawGrid = (width: number, height: number) => {
  const container = new Group();

  for (let x = 0; x <= width; x += 1) {
    const lineLength = height * TILE_SIZE;
    const start = x * TILE_SIZE - lineLength * 0.5;
    const line = new Path({
      segments: [
        [start, -lineLength * 0.5],
        [start, lineLength * 0.5]
      ],
      strokeWidth: LINE_STYLE.width,
      strokeColor: LINE_STYLE.color
    });

    container.addChild(line);
  }

  for (let y = 0; y <= height; y += 1) {
    const lineLength = width * TILE_SIZE;
    const start = y * TILE_SIZE - lineLength * 0.5;
    const line = new Path({
      segments: [
        [-lineLength * 0.5, start],
        [lineLength * 0.5, start]
      ],
      strokeWidth: LINE_STYLE.width,
      strokeColor: LINE_STYLE.color
    });

    container.addChild(line);
  }

  container.scaling = new Point(SCALING_CONST, SCALING_CONST);
  container.applyMatrix = true;
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
    container: container.current
  };
};
