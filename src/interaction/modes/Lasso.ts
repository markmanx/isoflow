// import { CoordsUtils, isWithinBounds } from 'src/utils';
// import { ModeActions } from 'src/types';

// export const Lasso: ModeActions = {
//   type: 'LASSO',
//   mousemove: ({ uiState, scene }) => {
//     if (uiState.mode.type !== 'LASSO') return;

//     if (uiState.mouse.mousedown === null) return;
//     // User is in mousedown mode

//     if (
//       uiState.mouse.delta === null ||
//       CoordsUtils.isEqual(uiState.mouse.delta.tile, CoordsUtils.zero())
//     )
//       return;
//     // User has moved tile since they moused down

//     if (!uiState.mode.isDragging) {
//       const { mousedown } = uiState.mouse;
//       const items = scene.nodes.filter((node) => {
//         return CoordsUtils.isEqual(node.tile, mousedown.tile);
//       });

//       // User is creating a selection
//       uiState.mode.selection = {
//         startTile: uiState.mouse.mousedown.tile,
//         endTile: uiState.mouse.position.tile,
//         items
//       };

//       return;
//     }

//     if (uiState.mode.isDragging) {
//       // User is dragging an existing selection
//       uiState.mode.selection.startTile = CoordsUtils.add(
//         uiState.mode.selection.startTile,
//         uiState.mouse.delta.tile
//       );
//       uiState.mode.selection.endTile = CoordsUtils.add(
//         uiState.mode.selection.endTile,
//         uiState.mouse.delta.tile
//       );
//     }
//   },
//   mousedown: (draftState) => {
//     if (draftState.mode.type !== 'LASSO') return;

//     if (draftState.mode.selection) {
//       const isWithinSelection = isWithinBounds(draftState.mouse.position.tile, [
//         draftState.mode.selection.startTile,
//         draftState.mode.selection.endTile
//       ]);

//       if (!isWithinSelection) {
//         draftState.mode = {
//           type: 'CURSOR',
//           showCursor: true,
//           mousedown: null
//         };

//         return;
//       }

//       if (isWithinSelection) {
//         draftState.mode.isDragging = true;

//         return;
//       }
//     }

//     draftState.mode = {
//       type: 'CURSOR',
//       showCursor: true,
//       mousedown: null
//     };
//   }
// };
