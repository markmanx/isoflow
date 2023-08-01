import Paper from 'paper';
import { PROJECTED_TILE_DIMENSIONS } from 'src/renderer/utils/constants';
import { Coords } from 'src/types';
import { clamp, CoordsUtils } from 'src/utils';
import { SortedSceneItems, Node } from 'src/stores/useSceneStore';
import { Scroll } from 'src/stores/useUiStateStore';

const halfW = PROJECTED_TILE_DIMENSIONS.width * 0.5;
const halfH = PROJECTED_TILE_DIMENSIONS.height * 0.5;

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
  const canvasPosition = {
    x: mousePosition.x - (scroll.position.x + Paper.view.bounds.center.x),
    y:
      mousePosition.y - (scroll.position.y + Paper.view.bounds.center.y) + halfH
  };

  const row = Math.floor(
    ((mousePosition.x - scroll.position.x) / halfW + canvasPosition.y / halfH) /
      2
  );
  const col = Math.floor(
    (canvasPosition.y / halfH - canvasPosition.x / halfW) / 2
  );

  const halfRowNum = Math.floor(gridSize.x * 0.5);
  const halfColNum = Math.floor(gridSize.y * 0.5);

  return {
    x: clamp(row, -halfRowNum, halfRowNum),
    y: clamp(col, -halfColNum, halfColNum)
  };
};

export const getTilePosition = ({ x, y }: Coords) => {
  return { x: x * halfW - y * halfW, y: x * halfH + y * halfH };
};

export const getTileBounds = (coords: Coords) => {
  const position = getTilePosition(coords);

  return {
    left: {
      x: position.x - PROJECTED_TILE_DIMENSIONS.width * 0.5,
      y: position.y
    },
    right: {
      x: position.x + PROJECTED_TILE_DIMENSIONS.width * 0.5,
      y: position.y
    },
    top: {
      x: position.x,
      y: position.y - PROJECTED_TILE_DIMENSIONS.height * 0.5
    },
    bottom: {
      x: position.x,
      y: position.y + PROJECTED_TILE_DIMENSIONS.height * 0.5
    },
    center: { x: position.x, y: position.y }
  };
};

interface GetItemsByTile {
  tile: Coords;
  sortedSceneItems: SortedSceneItems;
}

// TODO: Acheive better performance with more granular functions e.g. getNodesByTile, or even getFirstNodeByTile
export const getItemsByTile = ({
  tile,
  sortedSceneItems
}: GetItemsByTile): { nodes: Node[] } => {
  const nodes = sortedSceneItems.nodes.filter((node) => {
    return CoordsUtils.isEqual(node.position, tile);
  });

  return { nodes };
};

interface GetItemsByTileV2 {
  tile: Coords;
  sceneItems: Node[];
}

export const getItemsByTileV2 = ({ tile, sceneItems }: GetItemsByTileV2) => {
  return sceneItems.filter((item) => {
    return CoordsUtils.isEqual(item.position, tile);
  });
};

interface CanvasCoordsToScreenCoords {
  position: Coords;
  scrollPosition: Coords;
  zoom: number;
}

export const canvasCoordsToScreenCoords = ({
  position,
  scrollPosition,
  zoom
}: CanvasCoordsToScreenCoords) => {
  const { width: viewW, height: viewH } = Paper.view.bounds;
  const { offsetLeft: offsetX, offsetTop: offsetY } =
    Paper.project.view.element;
  const container = Paper.project.activeLayer.children[0];
  const globalItemsGroupPosition = container.globalToLocal([0, 0]);
  const onScreenPosition = {
    x:
      (position.x +
        scrollPosition.x +
        globalItemsGroupPosition.x +
        container.position.x +
        viewW * 0.5) *
        zoom +
      offsetX,

    y:
      (position.y +
        scrollPosition.y +
        globalItemsGroupPosition.y +
        container.position.y +
        viewH * 0.5) *
        zoom +
      offsetY
  };

  return onScreenPosition;
};

type GetTileScreenPosition = CanvasCoordsToScreenCoords & {
  origin?: 'center' | 'top' | 'bottom' | 'left' | 'right';
};

export const getTileScreenPosition = ({
  position,
  scrollPosition,
  zoom,
  origin = 'center'
}: GetTileScreenPosition) => {
  const tilePosition = getTileBounds(position)[origin];
  const onScreenPosition = canvasCoordsToScreenCoords({
    position: tilePosition,
    scrollPosition,
    zoom
  });

  return onScreenPosition;
};

export const sortByPosition = (tiles: Coords[]) => {
  const xSorted = [...tiles];
  const ySorted = [...tiles];
  xSorted.sort((a, b) => {
    return a.x - b.x;
  });
  ySorted.sort((a, b) => {
    return a.y - b.y;
  });

  const highest = {
    byX: xSorted[xSorted.length - 1],
    byY: ySorted[ySorted.length - 1]
  };
  const lowest = { byX: xSorted[0], byY: ySorted[0] };

  const lowX = lowest.byX.x;
  const highX = highest.byX.x;
  const lowY = lowest.byY.y;
  const highY = highest.byY.y;

  return {
    byX: xSorted,
    byY: ySorted,
    highest,
    lowest,
    lowX,
    lowY,
    highX,
    highY
  };
};

// Returns a complete set of tiles that form a grid area (takes in any number of tiles to use points to encapsulate)
export const getGridSubset = (tiles: Coords[]) => {
  const { lowX, lowY, highX, highY } = sortByPosition(tiles);

  const subset = [];

  for (let x = lowX; x < highX + 1; x += 1) {
    for (let y = lowY; y < highY + 1; y += 1) {
      subset.push({ x, y });
    }
  }

  return subset;
};

export const isWithinBounds = (tile: Coords, bounds: Coords[]) => {
  const { lowX, lowY, highX, highY } = sortByPosition(bounds);

  return tile.x >= lowX && tile.x <= highX && tile.y >= lowY && tile.y <= highY;
};

// Returns the four corners of a grid that encapsulates all tiles
// passed in (at least 1 tile needed)
export const getBoundingBox = (
  tiles: Coords[],
  offset: Coords = CoordsUtils.zero()
) => {
  if (tiles.length === 0) {
    return null;
  }

  const { lowX, lowY, highX, highY } = sortByPosition(tiles);

  return [
    { x: lowX - offset.x, y: lowY - offset.y },
    { x: highX + offset.x, y: lowY - offset.y },
    { x: highX + offset.x, y: highY + offset.y },
    { x: lowX - offset.x, y: highY + offset.y }
  ];
};
