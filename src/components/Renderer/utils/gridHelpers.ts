import Paper from 'paper';
import { PROJECTED_TILE_DIMENSIONS } from '../constants';
import { Coords } from '../../../utils/Coords';
import { clamp } from '../../../utils';
import { SceneI, NodeSchemaI } from '../../../validation/SceneSchema';

interface GetTileFromMouse {
  mouse: Coords;
  scroll: Coords;
  gridSize: Coords;
}

export const getTileFromMouse = ({
  mouse,
  scroll,
  gridSize
}: GetTileFromMouse) => {
  const halfW = PROJECTED_TILE_DIMENSIONS.x / 2;
  const halfH = PROJECTED_TILE_DIMENSIONS.y / 2;

  const canvasPosition = new Coords(
    mouse.x - (scroll.x + Paper.view.bounds.center.x),
    mouse.y - (scroll.y + Paper.view.bounds.center.y) + halfH
  );

  const row = Math.floor(
    (canvasPosition.x / halfW + canvasPosition.y / halfH) / 2
  );
  const col = Math.floor(
    (canvasPosition.y / halfH - canvasPosition.x / halfW) / 2
  );

  const halfRowNum = Math.floor(gridSize.x * 0.5);
  const halfColNum = Math.floor(gridSize.y * 0.5);

  return new Coords(
    clamp(row, -halfRowNum, halfRowNum),
    clamp(col, -halfColNum, halfColNum)
  );
};

export const getTilePosition = ({ x, y }: Coords) => {
  const halfW = PROJECTED_TILE_DIMENSIONS.x * 0.5;
  const halfH = PROJECTED_TILE_DIMENSIONS.y * 0.5;

  return new Coords(x * halfW - y * halfW, x * halfH + y * halfH);
};

export const getTileBounds = (coords: Coords) => {
  const position = getTilePosition(coords);

  return {
    left: new Coords(
      position.x - PROJECTED_TILE_DIMENSIONS.x * 0.5,
      position.y
    ),
    right: new Coords(
      position.x + PROJECTED_TILE_DIMENSIONS.x * 0.5,
      position.y
    ),
    top: new Coords(position.x, position.y - PROJECTED_TILE_DIMENSIONS.y * 0.5),
    bottom: new Coords(
      position.x,
      position.y + PROJECTED_TILE_DIMENSIONS.y * 0.5
    ),
    center: new Coords(position.x, position.y)
  };
};

export const getItemsFromTile = (tile: Coords, scene: SceneI): NodeSchemaI[] =>
  scene.nodes.filter((node) => {
    const position = new Coords(node.position.x, node.position.y);
    return position.isEqual(tile);
  });
