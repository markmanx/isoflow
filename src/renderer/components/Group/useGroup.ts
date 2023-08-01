// import { useCallback, useRef } from 'react';
// import { Group, Shape } from 'paper';
// import { Coords } from 'src/types';
// import { PIXEL_UNIT, TILE_SIZE } from 'src/renderer/utils/constants';
// import { getColorVariant } from 'src/utils';
// import {
//   getBoundingBox,
//   sortByPosition,
//   getTileBounds
// } from '../../utils/gridHelpers';
// import { applyProjectionMatrix } from '../../utils/projection';

// export const useGroup = () => {
//   // TODO: Make sure consistent naming for all containers among all scene components
//   const containerRef = useRef(new Group());
//   const pathRef = useRef<paper.Shape.Rectangle>();

//   const setColor = useCallback((color: string) => {
//     if (!pathRef.current) return;

//     const fillColor = getColorVariant(color, 'light', { alpha: 0.5 });

//     pathRef.current.set({ fillColor, strokeColor: color });
//   }, []);

//   const setTiles = useCallback((tiles: Coords[]) => {
//     if (!pathRef.current) return;

//     const corners = getBoundingBox(tiles, { x: 1, y: 1 });

//     if (corners === null) {
//       containerRef.current.removeChildren();
//       throw new Error('Group has no nodes');
//     }

//     const sorted = sortByPosition(corners);
//     const size = {
//       x: sorted.highX - sorted.lowX,
//       y: sorted.highY - sorted.lowY
//     };

//     pathRef.current.set({
//       position: [0, 0],
//       radius: PIXEL_UNIT * 17,
//       size: [
//         (size.x + 1) * (TILE_SIZE - PIXEL_UNIT * 3),
//         (size.y + 1) * (TILE_SIZE - PIXEL_UNIT * 3)
//       ]
//     });

//     containerRef.current.set({
//       pivot: pathRef.current.bounds.bottomLeft,
//       position: getTileBounds(corners[3]).left
//     });
//   }, []);

//   // TODO: Do we really need init an init function on each component hook?  Does any of them take arguments?
//   const init = useCallback(() => {
//     containerRef.current.removeChildren();

//     pathRef.current = new Shape.Rectangle({
//       strokeCap: 'round',
//       strokeWidth: PIXEL_UNIT
//     });

//     containerRef.current.addChild(pathRef.current);
//     applyProjectionMatrix(containerRef.current);

//     return containerRef.current;
//   }, []);

//   return {
//     init,
//     setTiles,
//     setColor
//   };
// };
