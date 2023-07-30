import { Coords } from 'src/utils/Coords';

export const TILE_SIZE = 72;
export const PROJECTED_TILE_DIMENSIONS = new Coords(
  TILE_SIZE + TILE_SIZE / 3,
  (TILE_SIZE + TILE_SIZE / 3) / Math.sqrt(3)
);
export const getProjectedTileSize = (tileSize: number) => {
  return new Coords(tileSize / 3, (tileSize + tileSize / 3) / Math.sqrt(3));
};
export const PIXEL_UNIT = TILE_SIZE * 0.02;
export const SCALING_CONST = 0.9425;
