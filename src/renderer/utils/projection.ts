import { Matrix, Point } from 'paper';
import { Coords } from 'src/utils/Coords';

export const getProjectionMatrix = (x: number, y: number) => {
  return new Matrix([
    Math.sqrt(2) / 2,
    Math.sqrt(6) / 6,
    -(Math.sqrt(2) / 2),
    Math.sqrt(6) / 6,
    x - (Math.sqrt(2) / 2) * (x - y),
    y - (Math.sqrt(6) / 6) * (x + y - 2)
  ]);
};

export const applyProjectionMatrix = (
  item: paper.Item,
  pivot?: paper.Point,
  rotation?: number
) => {
  const matrix = getProjectionMatrix(0, 0);
  matrix.rotate(rotation ?? 0, new Point(0, 0));
  item.pivot = pivot ?? new Point(0, 0);
  item.matrix = matrix;

  return matrix;
};

export const getCSSMatrix = (
  translate: { x: number; y: number } = { x: 0, y: 0 }
) => {
  return `translate(${translate.x}, ${translate.y}) matrix(0.707, 0.409, -0.707, 0.409, 0, -0.816) translate(-${translate.x}, -${translate.y}) translateZ(0)`;
};
