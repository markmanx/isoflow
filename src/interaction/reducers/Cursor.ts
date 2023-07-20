import { InteractionReducer } from '../types';
import { getItemsByTile } from '../../renderer/utils/gridHelpers';

export const Cursor: InteractionReducer = {
  mousemove: () => {},
  mousedown: (draftState, { tile }) => {
    const itemsAtTile = getItemsByTile({
      tile,
      sceneItems: draftState.scene
    });

    if (itemsAtTile.nodes.length > 0) {
      draftState.mode = {
        type: 'DRAG_ITEMS',
        items: itemsAtTile,
        hasMovedTile: false
      };
    } else {
      draftState.scene.nodes = draftState.scene.nodes.map((node) => ({
        ...node,
        isSelected: false
      }));
      draftState.contextMenu = null;
    }
  },
  mouseup: () => {},
  onTileOver: () => {}
};
