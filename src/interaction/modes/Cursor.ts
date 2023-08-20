import { produce } from 'immer';
import { ModeActions } from 'src/types';
import { getItemAtTile } from 'src/utils';

export const Cursor: ModeActions = {
  mousemove: ({ uiState }) => {
    if (uiState.mode.type !== 'CURSOR') return;

    if (uiState.mode.mousedownItem) {
      uiState.actions.setMode({
        type: 'DRAG_ITEMS',
        showCursor: true,
        items: [uiState.mode.mousedownItem]
      });
    }
  },
  mousedown: ({ uiState, scene, isRendererInteraction }) => {
    if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

    const itemAtTile = getItemAtTile({
      tile: uiState.mouse.position.tile,
      scene
    });

    uiState.actions.setMode(
      produce(uiState.mode, (draftState) => {
        if (itemAtTile) {
          draftState.mousedownItem = {
            type: itemAtTile.type,
            id: itemAtTile.id
          };
        } else {
          draftState.mousedownItem = null;
        }
      })
    );
  },
  mouseup: ({ uiState, isRendererInteraction }) => {
    if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

    if (uiState.mode.mousedownItem) {
      if (uiState.mode.mousedownItem.type === 'NODE') {
        uiState.actions.setItemControls({
          type: 'NODE',
          id: uiState.mode.mousedownItem.id
        });
      } else if (uiState.mode.mousedownItem.type === 'RECTANGLE') {
        uiState.actions.setItemControls({
          type: 'RECTANGLE',
          id: uiState.mode.mousedownItem.id
        });
      } else if (uiState.mode.mousedownItem.type === 'CONNECTOR') {
        uiState.actions.setItemControls({
          type: 'CONNECTOR',
          id: uiState.mode.mousedownItem.id
        });
      }
    } else {
      uiState.actions.setItemControls(null);
    }

    uiState.actions.setMode(
      produce(uiState.mode, (draftState) => {
        draftState.mousedownItem = null;
      })
    );
  }
};
