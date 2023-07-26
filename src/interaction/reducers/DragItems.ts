import { Coords } from 'src/utils/Coords';
import { InteractionReducer } from '../types';

export const DragItems: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'DRAG_ITEMS') return;

    if (
      draftState.mouse.delta !== null &&
      !draftState.mouse.delta.tile.isEqual(Coords.fromObject({ x: 0, y: 0 }))
    ) {
      // User has moved tile since the last mouse event
      draftState.mode.items.nodes.forEach((node) => {
        const nodeIndex = draftState.scene.nodes.findIndex(
          (sceneNode) => sceneNode.id === node.id
        );

        if (nodeIndex === -1) return;

        draftState.scene.nodes[nodeIndex].position =
          draftState.mouse.position.tile;
        draftState.contextMenu = null;
      });
    }
  },
  mousedown: () => {},
  mouseup: (draftState) => {
    draftState.mode = { type: 'CURSOR', mousedown: null };
  }
};
