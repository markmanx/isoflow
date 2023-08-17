import { hasMovedTile } from 'src/utils';
import { ModeActions } from 'src/types';

export const DragItems: ModeActions = {
  type: 'DRAG_ITEMS',
  entry: ({ uiState, scene, rendererRef }) => {
    const renderer = rendererRef;
    if (uiState.mode.type !== 'DRAG_ITEMS') return;

    renderer.style.userSelect = 'none';

    uiState.mode.items.forEach((item) => {
      if (item.type === 'NODE') {
        scene.actions.updateNode(item.id, {
          position: uiState.mouse.position.tile
        });
      }
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
    uiState.mode.items.forEach((item) => {
      if (item.type === 'NODE') {
        scene.actions.updateNode(item.id, {
          position: uiState.mouse.position.tile
        });
      }
    });

    uiState.actions.setContextMenu(null);
  },
  mouseup: ({ uiState }) => {
    uiState.actions.setMode({
      type: 'CURSOR',
      showCursor: true,
      mousedownItem: null
    });
  }
};
