import { produce } from 'immer';
import { ModeActions } from 'src/types';
import { getItemAtTile, generateId } from 'src/utils';

export const PlaceElement: ModeActions = {
  mousemove: () => {},
  mousedown: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'PLACE_ELEMENT') return;

    if (!uiState.mode.icon) {
      const itemAtTile = getItemAtTile({
        tile: uiState.mouse.position.tile,
        scene
      });

      uiState.actions.setMode({
        type: 'CURSOR',
        mousedownItem: itemAtTile,
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
