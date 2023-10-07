import { produce } from 'immer';
import { ModeActions } from 'src/types';
import { getItemAtTile, generateId } from 'src/utils';

export const PlaceElement: ModeActions = {
  mousemove: () => {},
  mousedown: ({ uiState, scene, isRendererInteraction }) => {
    if (uiState.mode.type !== 'PLACE_ELEMENT' || !isRendererInteraction) return;

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
        icon: uiState.mode.icon.id,
        tile: uiState.mouse.position.tile
      });
    }

    uiState.actions.setMode(
      produce(uiState.mode, (draft) => {
        draft.icon = null;
      })
    );
  }
};
