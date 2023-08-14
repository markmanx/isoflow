import { InteractionReducer } from 'src/types';
import { v4 as uuid } from 'uuid';
import { nodeInputToNode, filterNodesByTile } from 'src/utils';

export const PlaceElement: InteractionReducer = {
  type: 'PLACE_ELEMENT',
  mousemove: () => {},
  mousedown: (draftState) => {
    if (draftState.mode.type !== 'PLACE_ELEMENT') return;

    if (!draftState.mode.icon) {
      const itemsAtTile = filterNodesByTile({
        tile: draftState.mouse.position.tile,
        nodes: draftState.scene.nodes
      });

      draftState.mode = {
        type: 'CURSOR',
        mousedown: {
          items: itemsAtTile,
          tile: draftState.mouse.position.tile
        },
        showCursor: true
      };

      draftState.itemControls = null;
    }
  },
  mouseup: (draftState) => {
    if (draftState.mode.type !== 'PLACE_ELEMENT') return;

    if (draftState.mode.icon !== null) {
      const newNode = nodeInputToNode({
        id: uuid(),
        iconId: draftState.mode.icon.id,
        label: 'New Node',
        position: draftState.mouse.position.tile
      });

      draftState.mode.icon = null;
      draftState.scene.nodes.push(newNode);
    }
  }
};
