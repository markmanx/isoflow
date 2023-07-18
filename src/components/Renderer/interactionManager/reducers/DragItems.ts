import { InteractionReducer } from '../useInteractionManager';
import { getTileFromMouse } from '../../utils/gridHelpers';

export const DragItems: InteractionReducer = {
  mousemove: (state, { tile }) => {
    if (state.mode.type !== 'DRAG_ITEMS') return;

    state.mode.nodes.forEach((node) => {
      const sceneNodeIndex = state.scene.nodes.findIndex(
        (sceneNode) => sceneNode.id === node.id
      );

      if (sceneNodeIndex === -1) return;

      state.scene.nodes[sceneNodeIndex].position = tile;
    });

    state.mode.hasMovedTile = true;
  },
  mousedown: (state) => {},
  mouseup: (state) => {
    state.mode = { type: 'SELECT' };
  }
};
