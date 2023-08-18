import { hasMovedTile, CoordsUtils, getItemById } from 'src/utils';
import { ModeActions } from 'src/types';

export const DragItems: ModeActions = {
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
      } else if (item.type === 'RECTANGLE' && uiState.mouse.delta?.tile) {
        const { item: rectangle } = getItemById(scene.rectangles, item.id);
        const newFrom = CoordsUtils.add(
          rectangle.from,
          uiState.mouse.delta.tile
        );
        const newTo = CoordsUtils.add(rectangle.to, uiState.mouse.delta.tile);
        // const bounds = getBoundingBox([rectangle.from, rectangle.to]);

        // scene.nodes.forEach((node) => {
        //   if (isWithinBounds(node.position, bounds)) {
        //     draftState.actions.updateNode(node.id, {
        //       position: CoordsUtils.add(node.position, delta)
        //     });
        //   }
        // });

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
