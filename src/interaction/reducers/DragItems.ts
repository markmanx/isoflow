import { CoordsUtils } from 'src/utils';
import { InteractionReducer } from 'src/types';

export const DragItems: InteractionReducer = {
  type: 'DRAG_ITEMS',
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'DRAG_ITEMS') return;

    if (
      draftState.mouse.delta !== null &&
      !CoordsUtils.isEqual(draftState.mouse.delta.tile, CoordsUtils.zero())
    ) {
      // User has moved tile since the last mouse event
      draftState.mode.items.forEach((node) => {
        const nodeIndex = draftState.scene.nodes.findIndex((sceneNode) => {
          return sceneNode.id === node.id;
        });

        if (nodeIndex === -1) return;

        draftState.scene.nodes[nodeIndex].position =
          draftState.mouse.position.tile;

        draftState.contextMenu = null;
      });
    }
  },
  mouseup: (draftState) => {
    draftState.mode = { type: 'CURSOR', showCursor: true, mousedown: null };
  }
};
