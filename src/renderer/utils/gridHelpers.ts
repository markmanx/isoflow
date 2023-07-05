import { PROJECTED_TILE_HEIGHT, PROJECTED_TILE_WIDTH } from "../constants";
import { Coords } from "../elements/Coords";

// Iterates over every item in a 2 dimensional array
// const tileIterator = (w, h, cb) => {
//   const tiles = [];

//   new Array(w).fill(null).map((row, x) =>
//     new Array(h).fill(null).forEach((col, y) => {
//       return tiles.push(cb(x - Math.floor(w * 0.5), y - Math.floor(h * 0.5)));
//     })
//   );

//   return tiles;
// };

export const sortByPosition = (items: Coords[]) => {
  const xSorted = [...items];
  const ySorted = [...items];
  xSorted.sort((a, b) => a.x - b.x);
  ySorted.sort((a, b) => a.y - b.y);

  const highest = {
    byX: xSorted[xSorted.length - 1],
    byY: ySorted[ySorted.length - 1],
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
    highY,
  };
};

export const getBoundingBox = (
  tiles: Coords[],
  offset: Coords = new Coords(0, 0)
) => {
  const { lowX, lowY, highX, highY } = sortByPosition(tiles);

  return [
    new Coords(lowX - offset.x, lowY - offset.y),
    new Coords(highX + offset.x, lowY - offset.y),
    new Coords(highX + offset.x, highY + offset.y),
    new Coords(lowX - offset.x, highY + offset.y),
  ];
};

export const getTilePosition = (x: number, y: number) => {
  const halfW = PROJECTED_TILE_WIDTH * 0.5;
  const halfH = PROJECTED_TILE_HEIGHT * 0.5;

  return {
    x: x * halfW - y * halfW,
    y: x * halfH + y * halfH,
  };
};

export const getTileBounds = (x: number, y: number) => {
  const position = getTilePosition(x, y);

  return {
    left: { x: position.x - PROJECTED_TILE_WIDTH * 0.5, y: position.y },
    right: { x: position.x + PROJECTED_TILE_WIDTH * 0.5, y: position.y },
    top: { x: position.x, y: position.y - PROJECTED_TILE_HEIGHT * 0.5 },
    bottom: { x: position.x, y: position.y + PROJECTED_TILE_HEIGHT * 0.5 },
    center: { x: position.x, y: position.y },
  };
};

// function getGridSubset(tiles) {
//   const { lowX, lowY, highX, highY } = sortByPosition(tiles);

//   const subset = [];

//   for (let x = lowX; x < highX + 1; x += 1) {
//     for (let y = lowY; y < highY + 1; y += 1) {
//       subset.push({ x, y });
//     }
//   }

//   return subset;
// }

// function isWithinBounds(tile, bounds) {
//   const { lowX, lowY, highX, highY } = sortByPosition(bounds);

//   return tile.x >= lowX && tile.x <= highX && tile.y >= lowY && tile.y <= highY;
// }

// function getTranslation(start, end) {
//   return { x: start.x - end.x, y: start.y - end.y };
// }

// const diffStates = {
//   ADDED: "A",
//   REMOVED: "R",
//   SAME: "S",
// };

// function diffItems(oldArr, newArr) {
//   const items = [...oldArr, ...newArr].reduce((prev, i) => {
//     const match = prev.find((p) => p.id === i.id);

//     if (match) {
//       return [...prev];
//     }

//     return [...prev, i];
//   }, []);

//   const changes = items.reduce((prev, item) => {
//     const isNew = Boolean(newArr.find((i) => i.id === item.id));
//     const isOld = Boolean(oldArr.find((i) => i.id === item.id));

//     if (isNew && !isOld) {
//       return [...prev, { diffState: diffStates.ADDED, item }];
//     }

//     if (isOld && !isNew) {
//       return [...prev, { diffState: diffStates.REMOVED, item }];
//     }

//     return [...prev, { diffState: diffStates.SAME, item }];
//   }, []);

//   return changes;
// }

// module.exports = {
//   tileIterator,
//   sortByPosition,
//   getBoundingBox,
//   getGridSubset,
//   isWithinBounds,
//   diffItems,
// };
