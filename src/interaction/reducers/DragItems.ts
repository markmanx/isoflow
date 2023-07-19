import { InteractionReducer } from '../useInteractionManager';
import { getItemsFromTile } from '../../renderer/utils/gridHelpers';

export const DragItems: InteractionReducer = {
  mousemove: () => {},
  mousedown: () => {},
  mouseup: (state, { tile }) => {
    if (state.mode.type !== 'DRAG_ITEMS') return;

    if (!state.mode.hasMovedTile) {
      // select the item if it's been clicked but not dragged
      state.uiState.selectedItems = getItemsFromTile(tile, state.scene);
    }

    state.mode = { type: 'CURSOR' };
  },
  onTileOver: (state, { tile }) => {
    if (state.mode.type !== 'DRAG_ITEMS') return;

    state.mode.items.forEach((item) => {
      if (item.type === 'NODE') {
        const sceneNodeIndex = state.scene.nodes.findIndex(
          (sceneNode) => sceneNode.id === item.id
        );

        if (sceneNodeIndex === -1) return;

        state.scene.nodes[sceneNodeIndex].position = tile;
      }
    });

    state.mode.hasMovedTile = true;
  }
};
