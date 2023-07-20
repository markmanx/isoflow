import Paper from 'paper';
import { PROJECTED_TILE_DIMENSIONS } from 'src/renderer/utils/constants';
import { Coords } from 'src/utils/Coords';
import { clamp } from 'src/utils';
import { SceneItems } from 'src/stores/useSceneStore';
import { Scroll } from 'src/stores/useUiStateStore';

const halfW = PROJECTED_TILE_DIMENSIONS.x * 0.5;
const halfH = PROJECTED_TILE_DIMENSIONS.y * 0.5;

interface GetTileFromMouse {
  mousePosition: Coords;
  scroll: Scroll;
  gridSize: Coords;
}

export const getTileFromMouse = ({
  mousePosition,
  scroll,
  gridSize
}: GetTileFromMouse) => {
  const canvasPosition = new Coords(
    mousePosition.x - (scroll.position.x + Paper.view.bounds.center.x),
    mousePosition.y - (scroll.position.y + Paper.view.bounds.center.y) + halfH
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

export const getTilePosition = ({ x, y }: Coords) =>
  new Coords(x * halfW - y * halfW, x * halfH + y * halfH);

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

interface GetItemsByTile {
  tile: Coords;
  sceneItems: SceneItems;
}

export const getItemsByTile = ({ tile, sceneItems }: GetItemsByTile) => {
  const nodes = sceneItems.nodes.filter((node) => node.position.isEqual(tile));

  return { nodes };
};

interface GetTileScreenPosition {
  position: Coords;
  scrollPosition: Coords;
  zoom: number;
}

export const getTileScreenPosition = ({
  position,
  scrollPosition,
  zoom
}: GetTileScreenPosition) => {
  const { width: viewW, height: viewH } = Paper.view.bounds;
  const { offsetLeft: offsetX, offsetTop: offsetY } =
    Paper.project.view.element;
  const tilePosition = getTileBounds(position).center;
  const container = Paper.project.activeLayer.children[0];
  const globalItemsGroupPosition = container.globalToLocal([0, 0]);
  const screenPosition = new Coords(
    (tilePosition.x +
      scrollPosition.x +
      globalItemsGroupPosition.x +
      container.position.x +
      viewW * 0.5) *
      zoom +
      offsetX,

    (tilePosition.y +
      scrollPosition.y +
      globalItemsGroupPosition.y +
      container.position.y +
      viewH * 0.5) *
      zoom +
      offsetY
  );

  return screenPosition;
};
