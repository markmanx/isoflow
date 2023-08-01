import { PROJECTED_TILE_DIMENSIONS } from 'src/config';
import { Coords, TileOriginEnum, Node } from 'src/types';
import { CoordsUtils } from 'src/utils';

export const screenToIso = ({ x, y }: { x: number; y: number }) => {
  const editorWidth = window.innerWidth;
  const editorHeight = window.innerHeight;
  const halfW = PROJECTED_TILE_DIMENSIONS.width / 2;
  const halfH = PROJECTED_TILE_DIMENSIONS.height / 2;

  // The origin is the center of the project.
  const projectPosition = {
    x: x - editorWidth * 0.5,
    y: y - editorHeight * 0.5
  };

  const tile = {
    x: Math.floor(
      (projectPosition.x + halfW) / PROJECTED_TILE_DIMENSIONS.width -
        projectPosition.y / PROJECTED_TILE_DIMENSIONS.height
    ),
    y: -Math.floor(
      (projectPosition.y + halfH) / PROJECTED_TILE_DIMENSIONS.height +
        projectPosition.x / PROJECTED_TILE_DIMENSIONS.width
    )
  };

  return tile;
};

export const getTilePosition = (
  { x, y }: { x: number; y: number },
  origin: TileOriginEnum = TileOriginEnum.CENTER
) => {
  const editorWidth = window.innerWidth;
  const editorHeight = window.innerHeight;
  const halfW = PROJECTED_TILE_DIMENSIONS.width / 2;
  const halfH = PROJECTED_TILE_DIMENSIONS.height / 2;

  const position: Coords = {
    x: editorWidth * 0.5 + (halfW * x - halfW * y),
    y: editorHeight * 0.5 - (halfH * x + halfH * y) + halfH
  };

  switch (origin) {
    case TileOriginEnum.TOP:
      return CoordsUtils.add(position, { x: 0, y: -halfH });
    case TileOriginEnum.BOTTOM:
      return CoordsUtils.add(position, { x: 0, y: halfH });
    case TileOriginEnum.LEFT:
      return CoordsUtils.add(position, { x: -halfW, y: 0 });
    case TileOriginEnum.RIGHT:
      return CoordsUtils.add(position, { x: halfW, y: 0 });
    case TileOriginEnum.CENTER:
    default:
      return position;
  }
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

export const getIsoMatrixCSS = () => {
  return `matrix(0.707, 0.409, -0.707, 0.409, 0, -0.816)`;
};

export const getTranslateCSS = (translate: Coords = { x: 0, y: 0 }) => {
  return `translate(${translate.x}px, ${translate.y}px)`;
};

interface GetNodesByTile {
  tile: Coords;
  nodes: Node[];
}

export const filterNodesByTile = ({ tile, nodes }: GetNodesByTile): Node[] => {
  return nodes.filter((node) => {
    return CoordsUtils.isEqual(node.position, tile);
  });
};
