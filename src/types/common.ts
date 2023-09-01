import type { SceneInput } from './inputs';

export type InitialData = SceneInput & {
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

export enum ProjectionOrientationEnum {
  X = 'X',
  Y = 'Y'
}

export type BoundingBox = [Coords, Coords, Coords, Coords];
