import { produce } from 'immer';
import { ModeActions, Coords, SceneItemReference, SceneStore } from 'src/types';
import {
  getItemById,
  CoordsUtils,
  hasMovedTile,
  getAnchorParent
} from 'src/utils';

const dragItems = (
  items: SceneItemReference[],
  tile: Coords,
  delta: Coords,
  scene: SceneStore
) => {
  items.forEach((item) => {
    if (item.type === 'NODE') {
      const node = getItemById(scene.nodes, item.id).item;

      scene.actions.updateNode(item.id, {
        tile: CoordsUtils.add(node.tile, delta)
      });
    } else if (item.type === 'RECTANGLE') {
      const rectangle = getItemById(scene.rectangles, item.id).item;
      const newFrom = CoordsUtils.add(rectangle.from, delta);
      const newTo = CoordsUtils.add(rectangle.to, delta);

      scene.actions.updateRectangle(item.id, { from: newFrom, to: newTo });
    } else if (item.type === 'TEXTBOX') {
      const textBox = getItemById(scene.textBoxes, item.id).item;

      scene.actions.updateTextBox(item.id, {
        tile: CoordsUtils.add(textBox.tile, delta)
      });
    } else if (item.type === 'CONNECTOR_ANCHOR') {
      const connector = getAnchorParent(item.id, scene.connectors);

      const newConnector = produce(connector, (draft) => {
        const { item: anchor, index: anchorIndex } = getItemById(
          connector.anchors,
          item.id
        );

        if (anchor.ref.type !== 'TILE') return;

        draft.anchors[anchorIndex] = {
          ...anchor,
          ref: {
            type: 'TILE',
            coords: tile
          }
        };
      });

      scene.actions.updateConnector(connector.id, newConnector);
    }
  });
};

export const DragItems: ModeActions = {
  entry: ({ uiState, rendererRef }) => {
    if (uiState.mode.type !== 'DRAG_ITEMS' || !uiState.mouse.mousedown) return;

    const renderer = rendererRef;
    renderer.style.userSelect = 'none';
  },
  exit: ({ rendererRef }) => {
    const renderer = rendererRef;
    renderer.style.userSelect = 'auto';
  },
  mousemove: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'DRAG_ITEMS' || !uiState.mouse.mousedown) return;

    if (uiState.mode.isInitialMovement) {
      const delta = CoordsUtils.subtract(
        uiState.mouse.position.tile,
        uiState.mouse.mousedown.tile
      );

      dragItems(uiState.mode.items, uiState.mouse.position.tile, delta, scene);

      uiState.actions.setMode(
        produce(uiState.mode, (draft) => {
          draft.isInitialMovement = false;
        })
      );

      return;
    }

    if (!hasMovedTile(uiState.mouse) || !uiState.mouse.delta?.tile) return;

    const delta = uiState.mouse.delta.tile;

    dragItems(uiState.mode.items, uiState.mouse.position.tile, delta, scene);
  },
  mouseup: ({ uiState }) => {
    uiState.actions.setMode({
      type: 'CURSOR',
      showCursor: true,
      mousedownItem: null
    });
  }
};
