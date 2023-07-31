import { Coords } from 'src/utils/Coords';

export const TILE_SIZE = 60;
export const PROJECTED_TILE_DIMENSIONS = new Coords(TILE_SIZE, TILE_SIZE / 2);
export const PIXEL_UNIT = TILE_SIZE * 0.02;
export const SCALING_CONST = 0.9425;
