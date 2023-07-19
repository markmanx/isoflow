import { getItemsByTile } from 'src/renderer/utils/gridHelpers';
import { InteractionReducer } from '../types';

export const DragItems: InteractionReducer = {
  mousemove: () => {},
  mousedown: () => {},
  mouseup: (draftState, { tile }) => {
    if (draftState.mode.type !== 'DRAG_ITEMS') return;

    if (!draftState.mode.hasMovedTile) {
      // Set the item to a selected state if the item has been clicked in place,
      // but not dragged
      const itemsAtTile = getItemsByTile({
        tile,
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
      }
    }

    draftState.mode = { type: 'CURSOR' };
  },
  onTileOver: (draftState, { tile }) => {
    if (draftState.mode.type !== 'DRAG_ITEMS') return;

    draftState.mode.items.nodes.forEach((node) => {
      const nodeIndex = draftState.scene.nodes.findIndex(
        (sceneNode) => sceneNode.id === node.id
      );

      if (nodeIndex === -1) return;

      draftState.scene.nodes[nodeIndex].position = tile;
    });

    draftState.mode.hasMovedTile = true;
  }
};
