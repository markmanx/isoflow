import { InteractionReducer } from '../useInteractionManager';
import { getTileFromMouse } from '../../utils/gridHelpers';

export const DragItems: InteractionReducer = {
  mousemove: (state) => {
    if (state.mode.type !== 'DRAG_ITEMS') return;

    const tile = getTileFromMouse({
      mouse: state.mouse.position,
      gridSize: state.gridSize,
      scroll: state.scroll.position
    });

    state.mode.nodes.forEach((node) => {
      const sceneNodeIndex = state.scene.nodes.findIndex(
        (sceneNode) => sceneNode.id === node.id
      );

      if (sceneNodeIndex === -1) return;

      state.scene.nodes[sceneNodeIndex].position = tile;
    });
  },
  mousedown: (state) => {},
  mouseup: (state) => {
    state.mode = { type: 'SELECT' };
  }
};
