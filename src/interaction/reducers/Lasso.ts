import { Coords } from 'src/utils/Coords';
import { isWithinBounds } from 'src/renderer/utils/gridHelpers';
import { InteractionReducer } from '../types';

export const Lasso: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'LASSO') return;

    if (draftState.mouse.mousedown === null) return;
    // User has moused down (they are in dragging mode)

    if (
      draftState.mouse.delta === null ||
      draftState.mouse.delta.tile.isEqual(Coords.zero())
    )
      return;
    // User has moved tile since the last mousedown event

    if (!draftState.mode.isDragging) {
      // User is creating the selection (not dragging)
      draftState.mode.selection = {
        startTile: draftState.mouse.mousedown.tile,
        endTile: draftState.mouse.position.tile
      };

      return;
    }

    if (draftState.mode.isDragging) {
      // User is dragging the selection
      draftState.mode.selection = {
        startTile: draftState.mode.selection.startTile.add(
          draftState.mouse.delta.tile
        ),
        endTile: draftState.mode.selection.endTile.add(
          draftState.mouse.delta.tile
        )
      };
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
          mousedownItems: null
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
      mousedownItems: null
    };
  },
  mouseup: () => {}
};
