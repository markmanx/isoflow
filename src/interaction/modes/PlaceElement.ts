import { produce } from 'immer';
import { InteractionReducer } from 'src/types';
import { filterNodesByTile, generateId } from 'src/utils';

export const PlaceElement: InteractionReducer = {
  type: 'PLACE_ELEMENT',
  mousemove: () => {},
  mousedown: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'PLACE_ELEMENT') return;

    if (!uiState.mode.icon) {
      const itemsAtTile = filterNodesByTile({
        tile: uiState.mouse.position.tile,
        nodes: scene.nodes
      });

      uiState.actions.setMode({
        type: 'CURSOR',
        mousedown: {
          items: itemsAtTile,
          tile: uiState.mouse.position.tile
        },
        showCursor: true
      });

      uiState.actions.setItemControls(null);
    }
  },
  mouseup: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'PLACE_ELEMENT') return;

    if (uiState.mode.icon !== null) {
      scene.actions.createNode({
        id: generateId(),
        iconId: uiState.mode.icon.id,
        label: 'New Node',
        position: uiState.mouse.position.tile
      });

      const newMode = produce(uiState.mode, (draftState) => {
        draftState.icon = null;
      });

      uiState.actions.setMode(newMode);
    }
  }
};
