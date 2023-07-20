import { getItemsByTile } from 'src/renderer/utils/gridHelpers';
import { SidebarTypeEnum } from 'src/stores/useUiStateStore';
import { InteractionReducer } from '../types';

export const DragItems: InteractionReducer = {
  mousemove: (draftState, { prevMouse }) => {
    if (draftState.mode.type !== 'DRAG_ITEMS') return;

    if (!prevMouse.tile.isEqual(draftState.mouse.tile)) {
      draftState.mode.items.nodes.forEach((node) => {
        const nodeIndex = draftState.scene.nodes.findIndex(
          (sceneNode) => sceneNode.id === node.id
        );

        if (nodeIndex === -1) return;

        draftState.scene.nodes[nodeIndex].position = draftState.mouse.tile;
        draftState.contextMenu = null;
      });

      draftState.mode.hasMovedTile = true;
    }
  },
  mousedown: () => {},
  mouseup: (draftState) => {
    if (draftState.mode.type !== 'DRAG_ITEMS') return;

    if (!draftState.mode.hasMovedTile) {
      // Set the item to a selected state if the item has been clicked in place,
      // but not dragged
      const itemsAtTile = getItemsByTile({
        tile: draftState.mouse.tile,
        sceneItems: draftState.scene
      });

      if (itemsAtTile.nodes.length > 0) {
        const firstNode = itemsAtTile.nodes[0];

        const nodeIndex = draftState.scene.nodes.findIndex(
          (sceneNode) => sceneNode.id === firstNode.id
        );

        if (nodeIndex === -1) return;

        draftState.scene.nodes[nodeIndex].isSelected = true;
        draftState.contextMenu = draftState.scene.nodes[nodeIndex];
        draftState.itemControls = {
          type: SidebarTypeEnum.SINGLE_NODE,
          nodeId: draftState.scene.nodes[nodeIndex].id
        };
      }
    }

    draftState.mode = { type: 'CURSOR' };
  }
};
