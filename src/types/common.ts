import type { SceneInput } from './inputs';

export type InitialScene = Partial<SceneInput> & {
  zoom?: number;
};

export interface Coords {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect {
  from: Coords;
  to: Coords;
}

export const ProjectionOrientationEnum = {
  X: 'X',
  Y: 'Y'
} as const;

export type BoundingBox = [Coords, Coords, Coords, Coords];

export type SlimMouseEvent = Pick<
  MouseEvent,
  'clientX' | 'clientY' | 'target' | 'type'
>;
