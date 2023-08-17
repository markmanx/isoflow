import { hasMovedTile } from 'src/utils';
import { InteractionReducer } from 'src/types';

export const DragItems: InteractionReducer = {
  type: 'DRAG_ITEMS',
  entry: ({ uiState, scene, rendererRef }) => {
    const renderer = rendererRef;
    if (uiState.mode.type !== 'DRAG_ITEMS') return;

    renderer.style.userSelect = 'none';

    uiState.mode.items.forEach((node) => {
      scene.actions.updateNode(node.id, {
        position: uiState.mouse.position.tile
      });
    });
  },
  exit: ({ rendererRef }) => {
    const renderer = rendererRef;
    renderer.style.userSelect = 'auto';
  },
  mousemove: ({ uiState, scene }) => {
    if (
      uiState.mode.type !== 'DRAG_ITEMS' ||
      !uiState.mouse.mousedown ||
      !hasMovedTile(uiState.mouse)
    )
      return;

    // User is dragging
    uiState.mode.items.forEach((node) => {
      scene.actions.updateNode(node.id, {
        position: uiState.mouse.position.tile
      });
    });

    uiState.actions.setContextMenu(null);
  },
  mouseup: ({ uiState }) => {
    uiState.actions.setMode({
      type: 'CURSOR',
      showCursor: true,
      mousedown: null
    });
  }
};
