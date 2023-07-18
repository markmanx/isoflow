import { InteractionReducer } from '../useInteractionManager';
import { getTileFromMouse, getItemsFromTile } from '../../utils/gridHelpers';

export const Select: InteractionReducer = {
  mousemove: (state) => {},
  mousedown: (state) => {
    const tile = getTileFromMouse({
      mouse: state.mouse.position,
      gridSize: state.gridSize,
      scroll: state.scroll.position
    });

    const tileItems = getItemsFromTile(tile, state.scene);

    if (tileItems.length > 0) {
      state.mode = { type: 'DRAG_ITEMS', nodes: tileItems };
    }
  },
  mouseup: (state) => {}
};
