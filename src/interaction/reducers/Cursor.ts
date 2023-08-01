import { SidebarTypeEnum } from 'src/stores/useUiStateStore';
import { CoordsUtils } from 'src/utils';
import { InteractionReducer } from '../types';
import { getItemsByTile } from '../../renderer/utils/gridHelpers';

export const Cursor: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'CURSOR') return;

    if (
      draftState.mouse.delta === null ||
      CoordsUtils.isEqual(draftState.mouse.delta?.tile, CoordsUtils.zero())
    )
      return;
    // User has moved tile since the last event

    if (draftState.mode.mousedown) {
      // User is in mousedown mode
      if (draftState.mode.mousedown.items.nodes.length > 0) {
        // User's last mousedown action was on a node
        draftState.mode = {
          type: 'DRAG_ITEMS',
          showCursor: true,
          items: draftState.mode.mousedown.items
        };

        return;
      }

      draftState.mode = {
        type: 'LASSO',
        showCursor: false,
        selection: {
          startTile: draftState.mode.mousedown.tile,
          endTile: draftState.mouse.position.tile,
          items: []
        },
        isDragging: false
      };
    }
  },
  mousedown: (draftState) => {
    if (draftState.mode.type !== 'CURSOR') return;

    const itemsAtTile = getItemsByTile({
      tile: draftState.mouse.position.tile,
      sortedSceneItems: draftState.scene
    });

    draftState.mode.mousedown = {
      items: itemsAtTile,
      tile: draftState.mouse.position.tile
    };
  },
  mouseup: (draftState) => {
    if (draftState.mode.type !== 'CURSOR') return;

    draftState.scene.nodes = draftState.scene.nodes.map((node) => {
      return {
        ...node,
        isSelected: false
      };
    });

    if (draftState.mode.mousedown !== null) {
      // User's last mousedown action was on a scene item
      const mousedownNode = draftState.mode.mousedown.items.nodes[0];

      if (mousedownNode) {
        // The user's last mousedown action was on a node
        const nodeIndex = draftState.scene.nodes.findIndex((node) => {
          return node.id === mousedownNode.id;
        });

        if (nodeIndex === -1) return;

        draftState.contextMenu = draftState.scene.nodes[nodeIndex];
        draftState.scene.nodes[nodeIndex].isSelected = true;
        draftState.itemControls = {
          type: SidebarTypeEnum.SINGLE_NODE,
          nodeId: draftState.scene.nodes[nodeIndex].id
        };
        draftState.mode.mousedown = null;

        return;
      }

      // Empty tile selected
      draftState.contextMenu = {
        type: 'EMPTY_TILE',
        position: draftState.mouse.position.tile
      };
      draftState.itemControls = null;
      draftState.mode.mousedown = null;
    }
  }
};
