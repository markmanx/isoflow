import { produce } from 'immer';
import { ItemControlsTypeEnum, InteractionReducer } from 'src/types';
import { filterNodesByTile, getItemById, hasMovedTile } from 'src/utils';

export const Cursor: InteractionReducer = {
  type: 'CURSOR',
  mousemove: ({ uiState }) => {
    if (uiState.mode.type !== 'CURSOR' || !hasMovedTile(uiState.mouse)) return;

    if (uiState.mode.mousedown) {
      // User is in mousedown mode
      if (uiState.mode.mousedown.items.length > 0) {
        // User's last mousedown action was on a node
        uiState.actions.setMode({
          type: 'DRAG_ITEMS',
          showCursor: true,
          items: uiState.mode.mousedown.items
        });
      }

      // draftState.mode = {
      //   type: 'LASSO',
      //   showCursor: false,
      //   selection: {
      //     startTile: draftState.mode.mousedown.tile,
      //     endTile: draftState.mouse.position.tile,
      //     items: []
      //   },
      //   isDragging: false
      // };
    }
  },
  mousedown: ({ uiState, scene, isRendererInteraction }) => {
    if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

    const itemsAtTile = filterNodesByTile({
      tile: uiState.mouse.position.tile,
      nodes: scene.nodes
    });

    const newMode = produce(uiState.mode, (draftState) => {
      draftState.mousedown = {
        items: itemsAtTile,
        tile: uiState.mouse.position.tile
      };
    });

    uiState.actions.setMode(newMode);
  },
  mouseup: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'CURSOR') return;

    scene.nodes.forEach((node) => {
      if (node.isSelected)
        scene.actions.updateNode(node.id, { isSelected: false });
    });

    if (uiState.mode.mousedown !== null) {
      // User's last mousedown action was on a scene item
      const mousedownNode = uiState.mode.mousedown.items[0];

      if (mousedownNode) {
        // The user's last mousedown action was on a node
        const { item: node } = getItemById(scene.nodes, mousedownNode.id);

        uiState.actions.setContextMenu(node);
        // state.sceneActions.updateNode(node.id, { isSelected: true });
        uiState.actions.setItemControls({
          type: ItemControlsTypeEnum.SINGLE_NODE,
          nodeId: node.id
        });
      } else {
        // Empty tile selected
        uiState.actions.setContextMenu({
          type: 'EMPTY_TILE',
          position: uiState.mouse.position.tile
        });

        uiState.actions.setItemControls(null);
      }

      const newMode = produce(uiState.mode, (draftState) => {
        draftState.mousedown = null;
      });

      uiState.actions.setMode(newMode);
    }
  }
};
