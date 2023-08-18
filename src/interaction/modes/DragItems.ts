import { ModeActions } from 'src/types';
import { getItemById, CoordsUtils, hasMovedTile } from 'src/utils';

export const DragItems: ModeActions = {
  entry: ({ uiState, rendererRef }) => {
    const renderer = rendererRef;
    if (uiState.mode.type !== 'DRAG_ITEMS') return;

    renderer.style.userSelect = 'none';
  },
  exit: ({ rendererRef }) => {
    const renderer = rendererRef;
    renderer.style.userSelect = 'auto';
  },
  mousemove: ({ uiState, scene }) => {
    if (
      uiState.mode.type !== 'DRAG_ITEMS' ||
      !uiState.mouse.mousedown ||
      !hasMovedTile(uiState.mouse) ||
      !uiState.mouse.delta?.tile
    )
      return;

    const delta = uiState.mouse.delta.tile;

    uiState.mode.items.forEach((item) => {
      if (item.type === 'NODE') {
        scene.actions.updateNode(item.id, {
          position: uiState.mouse.position.tile
        });
      } else if (item.type === 'RECTANGLE') {
        const { item: rectangle } = getItemById(scene.rectangles, item.id);
        const newFrom = CoordsUtils.add(rectangle.from, delta);
        const newTo = CoordsUtils.add(rectangle.to, delta);

        scene.actions.updateRectangle(item.id, { from: newFrom, to: newTo });
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
