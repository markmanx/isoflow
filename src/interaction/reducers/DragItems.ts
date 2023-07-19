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

      if (itemsAtTile.length > 0) {
        const firstItem = itemsAtTile[0];

        if (firstItem.type === 'NODE') {
          const nodeIndex = draftState.scene.nodes.findIndex(
            (sceneNode) => sceneNode.id === firstItem.id
          );

          if (nodeIndex === -1) return;

          draftState.scene.nodes[nodeIndex].isSelected = true;
        }
      }
    }

    draftState.mode = { type: 'CURSOR' };
  },
  onTileOver: (draftState, { tile }) => {
    if (draftState.mode.type !== 'DRAG_ITEMS') return;

    draftState.mode.items.forEach((item) => {
      if (item.type === 'NODE') {
        const nodeIndex = draftState.scene.nodes.findIndex(
          (sceneNode) => sceneNode.id === item.id
        );

        if (nodeIndex === -1) return;

        draftState.scene.nodes[nodeIndex].position = tile;
      }
    });

    draftState.mode.hasMovedTile = true;
  }
};
