import { produce } from 'immer';
import {
  TILE_PROJECTION_MULTIPLIERS,
  UNPROJECTED_TILE_SIZE,
  ZOOM_INCREMENT,
  MAX_ZOOM,
  MIN_ZOOM,
  CONNECTOR_DEFAULTS,
  TEXTBOX_DEFAULTS
} from 'src/config';
import {
  Coords,
  TileOriginEnum,
  Node,
  Size,
  Scroll,
  Mouse,
  ConnectorAnchor,
  SceneItem,
  Scene,
  Rect,
  ProjectionOrientationEnum,
  AnchorPositionsEnum,
  BoundingBox,
  TextBox
} from 'src/types';
import {
  CoordsUtils,
  clamp,
  roundToOneDecimalPlace,
  findPath,
  toPx
} from 'src/utils';

interface GetProjectedTileSize {
  zoom: number;
}

// Gets the size of a tile at a given zoom level
export const getProjectedTileSize = ({ zoom }: GetProjectedTileSize): Size => {
  return {
    width: UNPROJECTED_TILE_SIZE * TILE_PROJECTION_MULTIPLIERS.width * zoom,
    height: UNPROJECTED_TILE_SIZE * TILE_PROJECTION_MULTIPLIERS.height * zoom
  };
};

interface ScreenToIso {
  mouse: Coords;
  zoom: number;
  scroll: Scroll;
  rendererSize: Size;
}

// converts a mouse position to a tile position
export const screenToIso = ({
  mouse,
  zoom,
  scroll,
  rendererSize
}: ScreenToIso) => {
  const projectedTileSize = getProjectedTileSize({ zoom });
  const halfW = projectedTileSize.width / 2;
  const halfH = projectedTileSize.height / 2;

  const projectPosition = {
    x: -rendererSize.width * 0.5 + mouse.x - scroll.position.x,
    y: -rendererSize.height * 0.5 + mouse.y - scroll.position.y
  };

  const tile = {
    x: Math.floor(
      (projectPosition.x + halfW) / projectedTileSize.width -
        projectPosition.y / projectedTileSize.height
    ),
    y: -Math.floor(
      (projectPosition.y + halfH) / projectedTileSize.height +
        projectPosition.x / projectedTileSize.width
    )
  };

  return tile;
};

interface GetTilePosition {
  tile: Coords;
  scroll: Scroll;
  zoom: number;
  origin?: TileOriginEnum;
  rendererSize: Size;
}

export const getTilePosition = ({
  tile,
  scroll,
  zoom,
  origin = TileOriginEnum.CENTER,
  rendererSize
}: GetTilePosition) => {
  const projectedTileSize = getProjectedTileSize({ zoom });
  const halfW = projectedTileSize.width / 2;
  const halfH = projectedTileSize.height / 2;

  const position: Coords = {
    x:
      rendererSize.width * 0.5 +
      (halfW * tile.x - halfW * tile.y) +
      scroll.position.x,
    y:
      rendererSize.height * 0.5 -
      (halfH * tile.x + halfH * tile.y) +
      scroll.position.y
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
): BoundingBox => {
  const { lowX, lowY, highX, highY } = sortByPosition(tiles);

  return [
    { x: lowX - offset.x, y: lowY - offset.y },
    { x: highX + offset.x, y: lowY - offset.y },
    { x: highX + offset.x, y: highY + offset.y },
    { x: lowX - offset.x, y: highY + offset.y }
  ];
};

export const getBoundingBoxSize = (boundingBox: Coords[]): Size => {
  const { lowX, lowY, highX, highY } = sortByPosition(boundingBox);

  return {
    width: highX - lowX + 1,
    height: highY - lowY + 1
  };
};

const isoProjectionBaseValues = [0.707, -0.409, 0.707, 0.409, 0, -0.816];

export const getIsoMatrix = (orientation?: ProjectionOrientationEnum) => {
  switch (orientation) {
    case ProjectionOrientationEnum.Y:
      return produce(isoProjectionBaseValues, (draftState) => {
        draftState[1] = -draftState[1];
        draftState[2] = -draftState[2];
      });
    case ProjectionOrientationEnum.X:
    default:
      return isoProjectionBaseValues;
  }
};

export const getIsoProjectionCss = (
  orientation?: ProjectionOrientationEnum
) => {
  const matrixTransformValues = getIsoMatrix(orientation);

  return `matrix(${matrixTransformValues.join(', ')})`;
};

export const getTranslateCSS = (translate: Coords = { x: 0, y: 0 }) => {
  return `translate(${translate.x}px, ${translate.y}px)`;
};

export const incrementZoom = (zoom: number) => {
  const newZoom = clamp(zoom + ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
  return roundToOneDecimalPlace(newZoom);
};

export const decrementZoom = (zoom: number) => {
  const newZoom = clamp(zoom - ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
  return roundToOneDecimalPlace(newZoom);
};

interface GetMouse {
  interactiveElement: HTMLElement;
  zoom: number;
  scroll: Scroll;
  lastMouse: Mouse;
  mouseEvent: MouseEvent | TouchEvent;
  rendererSize: Size;
}

export const getMouse = ({
  interactiveElement,
  zoom,
  scroll,
  lastMouse,
  mouseEvent,
  rendererSize
}: GetMouse): Mouse => {
  const componentOffset = interactiveElement.getBoundingClientRect();
  const offset: Coords = {
    x: componentOffset?.left ?? 0,
    y: componentOffset?.top ?? 0
  };

  const clientX =
    (mouseEvent as MouseEvent).clientX ??
    (mouseEvent as TouchEvent).touches[0].clientX;
  const clientY =
    (mouseEvent as MouseEvent).clientY ??
    (mouseEvent as TouchEvent).touches[0].clientY;

  const mousePosition = {
    x: clientX - offset.x,
    y: clientY - offset.y
  };

  const newPosition: Mouse['position'] = {
    screen: mousePosition,
    tile: screenToIso({
      mouse: mousePosition,
      zoom,
      scroll,
      rendererSize
    })
  };

  const newDelta: Mouse['delta'] = {
    screen: CoordsUtils.subtract(newPosition.screen, lastMouse.position.screen),
    tile: CoordsUtils.subtract(newPosition.tile, lastMouse.position.tile)
  };

  const getMousedown = (): Mouse['mousedown'] => {
    switch (mouseEvent.type) {
      case 'mousedown':
        return newPosition;
      case 'mousemove':
        return lastMouse.mousedown;
      default:
        return null;
    }
  };

  const nextMouse: Mouse = {
    position: newPosition,
    delta: newDelta,
    mousedown: getMousedown()
  };

  return nextMouse;
};

export function getItemById<T extends { id: string }>(
  items: T[],
  id: string
): { item: T; index: number } {
  const index = items.findIndex((item) => {
    return item.id === id;
  });

  if (index === -1) {
    throw new Error(`Item with id "${id}" not found.`);
  }

  return { item: items[index], index };
}

interface GetAnchorPositions {
  anchor: ConnectorAnchor;
  nodes: Node[];
}

export const getAnchorPosition = ({
  anchor,
  nodes
}: GetAnchorPositions): Coords => {
  if (anchor.type === 'NODE') {
    const { item: node } = getItemById(nodes, anchor.id);
    return node.position;
  }

  return anchor.coords;
};

interface NormalisePositionFromOrigin {
  position: Coords;
  origin: Coords;
}

export const normalisePositionFromOrigin = ({
  position,
  origin
}: NormalisePositionFromOrigin) => {
  return CoordsUtils.subtract(origin, position);
};

interface GetConnectorPath {
  anchors: ConnectorAnchor[];
  nodes: Node[];
}

export const getConnectorPath = ({
  anchors,
  nodes
}: GetConnectorPath): {
  tiles: Coords[];
  rectangle: Rect;
} => {
  if (anchors.length < 2)
    throw new Error(
      `Connector needs at least two anchors (receieved: ${anchors.length})`
    );

  const anchorPositions = anchors.map((anchor) => {
    return getAnchorPosition({ anchor, nodes });
  });

  const searchArea = getBoundingBox(
    anchorPositions,
    CONNECTOR_DEFAULTS.searchOffset
  );

  const sorted = sortByPosition(searchArea);
  const searchAreaSize = getBoundingBoxSize(searchArea);
  const rectangle = {
    from: { x: sorted.highX, y: sorted.highY },
    to: { x: sorted.lowX, y: sorted.lowY }
  };

  const positionsNormalisedFromSearchArea = anchorPositions.map((position) => {
    return normalisePositionFromOrigin({ position, origin: rectangle.from });
  });

  const tiles = positionsNormalisedFromSearchArea.reduce<Coords[]>(
    (acc, position, i) => {
      if (i === 0) return acc;

      const prev = positionsNormalisedFromSearchArea[i - 1];
      const path = findPath({
        from: prev,
        to: position,
        gridSize: searchAreaSize
      });

      return [...acc, ...path];
    },
    []
  );

  return { tiles, rectangle };
};

type GetRectangleFromSize = (
  from: Coords,
  size: Size
) => { from: Coords; to: Coords };

export const getRectangleFromSize: GetRectangleFromSize = (from, size) => {
  return {
    from,
    to: { x: from.x + size.width, y: from.y + size.height }
  };
};

export const hasMovedTile = (mouse: Mouse) => {
  if (!mouse.delta) return false;

  return !CoordsUtils.isEqual(mouse.delta.tile, CoordsUtils.zero());
};

export const connectorPathTileToGlobal = (tile: Coords, origin: Coords) => {
  return CoordsUtils.subtract(
    CoordsUtils.subtract(origin, CONNECTOR_DEFAULTS.searchOffset),
    CoordsUtils.subtract(tile, CONNECTOR_DEFAULTS.searchOffset)
  );
};

export const getTextBoxTo = (textBox: TextBox) => {
  if (textBox.orientation === ProjectionOrientationEnum.X) {
    return CoordsUtils.add(textBox.tile, {
      x: textBox.size.width,
      y: 0
    });
  }

  return CoordsUtils.add(textBox.tile, {
    x: 0,
    y: -textBox.size.width
  });
};

interface GetItemAtTile {
  tile: Coords;
  scene: Scene;
}

export const getItemAtTile = ({
  tile,
  scene
}: GetItemAtTile): SceneItem | null => {
  const node = scene.nodes.find(({ position }) => {
    return CoordsUtils.isEqual(position, tile);
  });

  if (node) return node;

  const textBox = scene.textBoxes.find((tb) => {
    const textBoxTo = getTextBoxTo(tb);
    const textBoxBounds = getBoundingBox([
      tb.tile,
      { x: Math.ceil(textBoxTo.x), y: Math.ceil(textBoxTo.y) }
    ]);

    return isWithinBounds(tile, textBoxBounds);
  });

  if (textBox) return textBox;

  const connector = scene.connectors.find((con) => {
    return con.path.tiles.find((pathTile) => {
      const globalPathTile = connectorPathTileToGlobal(
        pathTile,
        con.path.rectangle.from
      );

      return CoordsUtils.isEqual(globalPathTile, tile);
    });
  });

  if (connector) return connector;

  const rectangle = scene.rectangles.find(({ from, to }) => {
    return isWithinBounds(tile, [from, to]);
  });

  if (rectangle) return rectangle;

  return null;
};

interface FontProps {
  fontWeight: number | string;
  fontSize: number;
  fontFamily: string;
}

export const getTextWidth = (text: string, fontProps: FontProps) => {
  if (!text) return 0;

  const paddingX = TEXTBOX_DEFAULTS.paddingX * UNPROJECTED_TILE_SIZE;
  const fontSizePx = toPx(fontProps.fontSize * UNPROJECTED_TILE_SIZE);
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Could not get canvas context');
  }

  context.font = `${fontProps.fontWeight} ${fontSizePx} ${fontProps.fontFamily}`;
  const metrics = context.measureText(text);

  canvas.remove();

  return (metrics.width + paddingX * 2) / UNPROJECTED_TILE_SIZE - 0.8;
};

export const outermostCornerPositions = [
  TileOriginEnum.BOTTOM,
  TileOriginEnum.RIGHT,
  TileOriginEnum.TOP,
  TileOriginEnum.LEFT
];

export const convertBoundsToNamedAnchors = (boundingBox: BoundingBox) => {
  return {
    [AnchorPositionsEnum.BOTTOM_LEFT]: boundingBox[0],
    [AnchorPositionsEnum.BOTTOM_RIGHT]: boundingBox[1],
    [AnchorPositionsEnum.TOP_RIGHT]: boundingBox[2],
    [AnchorPositionsEnum.TOP_LEFT]: boundingBox[3]
  };
};
