import { ModeActions, Coords, SceneItemReference, SceneStore } from 'src/types';
import { getItemById, CoordsUtils, hasMovedTile } from 'src/utils';

const dragItems = (
  items: SceneItemReference[],
  delta: Coords,
  scene: SceneStore
) => {
  items.forEach((item) => {
    if (item.type === 'NODE') {
      const node = getItemById(scene.nodes, item.id).item;

      scene.actions.updateNode(item.id, {
        position: CoordsUtils.add(node.position, delta)
      });
    } else if (item.type === 'RECTANGLE') {
      const rectangle = getItemById(scene.rectangles, item.id).item;
      const newFrom = CoordsUtils.add(rectangle.from, delta);
      const newTo = CoordsUtils.add(rectangle.to, delta);

      scene.actions.updateRectangle(item.id, { from: newFrom, to: newTo });
    }
  });
};

export const DragItems: ModeActions = {
  entry: ({ uiState, scene, rendererRef }) => {
    if (uiState.mode.type !== 'DRAG_ITEMS' || !uiState.mouse.mousedown) return;

    const renderer = rendererRef;
    renderer.style.userSelect = 'none';

    const delta = CoordsUtils.subtract(
      uiState.mouse.position.tile,
      uiState.mouse.mousedown.tile
    );
    dragItems(uiState.mode.items, delta, scene);
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

    dragItems(uiState.mode.items, delta, scene);

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
