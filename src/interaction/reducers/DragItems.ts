import { produce } from 'immer';
import { InteractionReducer } from 'src/types';

export const DragItems: InteractionReducer = {
  type: 'DRAG_ITEMS',
  entry: (draftState) => {
    draftState.rendererRef.style.userSelect = 'none';
  },
  exit: (draftState) => {
    draftState.rendererRef.style.userSelect = 'auto';
  },
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'DRAG_ITEMS' || !draftState.mouse.mousedown)
      return;

    // User is dragging
    const newScene = draftState.mode.items.reduce((acc, node) => {
      return produce(acc, (draft) => {
        const afterNodeUpdates = draftState.sceneActions.updateNode(
          node.id,
          {
            position: draftState.mouse.position.tile
          },
          acc
        );

        draft.nodes = afterNodeUpdates.nodes;
        draft.connectors = afterNodeUpdates.connectors;
      });
    }, draftState.scene);

    draftState.scene = newScene;
    draftState.contextMenu = null;
  },
  mouseup: (draftState) => {
    draftState.mode = { type: 'CURSOR', showCursor: true, mousedown: null };
  }
};
