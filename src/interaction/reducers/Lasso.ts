import { Coords } from 'src/utils/Coords';
import {
  isWithinBounds,
  getItemsByTileV2
} from 'src/renderer/utils/gridHelpers';
import { InteractionReducer } from '../types';

export const Lasso: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'LASSO') return;

    if (draftState.mouse.mousedown === null) return;
    // User is in mousedown mode

    if (
      draftState.mouse.delta === null ||
      draftState.mouse.delta.tile.isEqual(Coords.zero())
    )
      return;
    // User has moved tile since they moused down

    if (!draftState.mode.isDragging) {
      const { mousedown } = draftState.mouse;
      const items = draftState.scene.nodes.filter((node) => {
        return node.position.isEqual(mousedown.tile);
      });

      // User is creating a selection
      draftState.mode.selection = {
        startTile: draftState.mouse.mousedown.tile,
        endTile: draftState.mouse.position.tile,
        items
      };

      return;
    }

    if (draftState.mode.isDragging) {
      // User is dragging an existing selection
      draftState.mode.selection.startTile =
        draftState.mode.selection.startTile.add(draftState.mouse.delta.tile);
      draftState.mode.selection.endTile = draftState.mode.selection.endTile.add(
        draftState.mouse.delta.tile
      );
    }
  },
  mousedown: (draftState) => {
    if (draftState.mode.type !== 'LASSO') return;

    if (draftState.mode.selection) {
      const isWithinSelection = isWithinBounds(draftState.mouse.position.tile, [
        draftState.mode.selection.startTile,
        draftState.mode.selection.endTile
      ]);

      if (!isWithinSelection) {
        draftState.mode = {
          type: 'CURSOR',
          mousedown: null
        };

        return;
      }

      if (isWithinSelection) {
        draftState.mode.isDragging = true;

        return;
      }
    }

    draftState.mode = {
      type: 'CURSOR',
      mousedown: null
    };
  },
  mouseup: () => {}
};
