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
