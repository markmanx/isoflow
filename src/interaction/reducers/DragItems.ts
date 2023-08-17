import { hasMovedTile } from 'src/utils';
import { InteractionReducer } from 'src/types';

export const DragItems: InteractionReducer = {
  type: 'DRAG_ITEMS',
  entry: (state) => {
    const renderer = state.rendererRef;
    renderer.style.userSelect = 'none';
  },
  exit: (state) => {
    const renderer = state.rendererRef;
    renderer.style.userSelect = 'auto';
  },
  mousemove: (state) => {
    if (
      state.mode.type !== 'DRAG_ITEMS' ||
      !state.mouse.mousedown ||
      !hasMovedTile
    )
      return;

    // User is dragging
    state.mode.items.forEach((node) => {
      state.sceneActions.updateNode(node.id, {
        position: state.mouse.position.tile
      });
    });

    state.uiStateActions.setContextMenu(null);
  },
  mouseup: (state) => {
    state.uiStateActions.setMode({
      type: 'CURSOR',
      showCursor: true,
      mousedown: null
    });
  }
};
