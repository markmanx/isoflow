import { InteractionReducer } from '../useInteractionManager';
import { getItemsFromTile } from '../../utils/gridHelpers';

export const Select: InteractionReducer = {
  mousemove: (state) => {},
  mousedown: (state, { tile }) => {
    const tileItems = getItemsFromTile(tile, state.scene);

    if (tileItems.length > 0) {
      state.mode = {
        type: 'DRAG_ITEMS',
        nodes: tileItems,
        hasMovedTile: false
      };
    }
  },
  mouseup: (state) => {}
};
