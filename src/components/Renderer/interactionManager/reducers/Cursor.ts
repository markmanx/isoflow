import { InteractionReducer } from '../useInteractionManager';
import { getItemsFromTile } from '../../utils/gridHelpers';

export const Cursor: InteractionReducer = {
  mousemove: () => {},
  mousedown: (state, { tile }) => {
    const tileItems = getItemsFromTile(tile, state.scene);

    if (tileItems.length > 0) {
      state.mode = {
        type: 'DRAG_ITEMS',
        items: tileItems,
        hasMovedTile: false
      };
    }

    if (tileItems.length === 0) {
      state.uiState.selectedItems = [];
    }
  },
  mouseup: () => {},
  onTileOver: () => {}
};
