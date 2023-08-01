import { Size } from 'src/types';

export const TILE_SIZE = 100;
export const PROJECTED_TILE_DIMENSIONS: Size = {
  width: TILE_SIZE * 1.415,
  height: TILE_SIZE * 0.819
};
export const PIXEL_UNIT = TILE_SIZE * 0.02;
export const SCALING_CONST = 0.9425;
