import { produce } from 'immer';
import { ItemControlsTypeEnum, InteractionReducer } from 'src/types';
import {
  CoordsUtils,
  filterNodesByTile,
  getItemById,
  hasMovedTile
} from 'src/utils';

export const Cursor: InteractionReducer = {
  type: 'CURSOR',
  mousemove: (state) => {
    if (
      state.mode.type !== 'CURSOR' ||
      !hasMovedTile(state.mouse) ||
      !state.mouse.delta ||
      CoordsUtils.isEqual(state.mouse.delta.tile, CoordsUtils.zero())
    )
      return;

    // User has moved tile since the last event

    if (state.mode.mousedown) {
      // User is in mousedown mode
      if (state.mode.mousedown.items.length > 0) {
        // User's last mousedown action was on a node
        state.uiStateActions.setMode({
          type: 'DRAG_ITEMS',
          showCursor: true,
          items: state.mode.mousedown.items
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
  mousedown: (state) => {
    if (state.mode.type !== 'CURSOR' || !state.isRendererInteraction) return;

    const itemsAtTile = filterNodesByTile({
      tile: state.mouse.position.tile,
      nodes: state.scene.nodes
    });

    const newMode = produce(state.mode, (draftState) => {
      draftState.mousedown = {
        items: itemsAtTile,
        tile: state.mouse.position.tile
      };
    });

    state.uiStateActions.setMode(newMode);
  },
  mouseup: (state) => {
    if (state.mode.type !== 'CURSOR') return;

    state.scene.nodes.forEach((node) => {
      if (node.isSelected)
        state.sceneActions.updateNode(node.id, { isSelected: false });
    });

    if (state.mode.mousedown !== null) {
      // User's last mousedown action was on a scene item
      const mousedownNode = state.mode.mousedown.items[0];

      if (mousedownNode) {
        // The user's last mousedown action was on a node
        const { item: node } = getItemById(state.scene.nodes, mousedownNode.id);

        state.uiStateActions.setContextMenu(node);
        // state.sceneActions.updateNode(node.id, { isSelected: true });
        state.uiStateActions.setItemControls({
          type: ItemControlsTypeEnum.SINGLE_NODE,
          nodeId: node.id
        });
      } else {
        // Empty tile selected
        state.uiStateActions.setContextMenu({
          type: 'EMPTY_TILE',
          position: state.mouse.position.tile
        });
        state.uiStateActions.setItemControls(null);
      }

      const newMode = produce(state.mode, (draftState) => {
        draftState.mousedown = null;
      });

      state.uiStateActions.setMode(newMode);
    }
  }
};
