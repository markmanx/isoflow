import { produce } from 'immer';
import { ModeActions, ModeActionsAction } from 'src/types';
import { getItemAtTile, hasMovedTile } from 'src/utils';

const mousedown: ModeActionsAction = ({
  uiState,
  scene,
  isRendererInteraction
}) => {
  if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

  const itemAtTile = getItemAtTile({
    tile: uiState.mouse.position.tile,
    scene
  });

  if (itemAtTile) {
    uiState.actions.setMode(
      produce(uiState.mode, (draftState) => {
        draftState.mousedownItem = {
          type: itemAtTile.type,
          id: itemAtTile.id
        };
      })
    );

    uiState.actions.setItemControls(itemAtTile);
  } else {
    uiState.actions.setMode(
      produce(uiState.mode, (draftState) => {
        draftState.mousedownItem = null;
      })
    );

    uiState.actions.setItemControls(null);
  }
};

export const Cursor: ModeActions = {
  entry: (state) => {
    const { uiState } = state;

    if (uiState.mode.type !== 'CURSOR') return;

    if (uiState.mode.mousedownItem) {
      mousedown(state);
    }
  },
  mousemove: ({ uiState }) => {
    if (uiState.mode.type !== 'CURSOR' || !hasMovedTile(uiState.mouse)) return;

    const { mousedownItem } = uiState.mode;

    if (mousedownItem) {
      uiState.actions.setMode({
        type: 'DRAG_ITEMS',
        showCursor: true,
        items: [mousedownItem],
        isInitialMovement: true
      });
    }
  },
  mousedown: (state) => {
    mousedown(state);
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

        uiState.actions.setMode({
          type: 'RECTANGLE.TRANSFORM',
          id: uiState.mode.mousedownItem.id,
          showCursor: true,
          selectedAnchor: null
        });

        return;
      } else if (uiState.mode.mousedownItem.type === 'CONNECTOR') {
        uiState.actions.setItemControls({
          type: 'CONNECTOR',
          id: uiState.mode.mousedownItem.id
        });
      } else if (uiState.mode.mousedownItem.type === 'TEXTBOX') {
        uiState.actions.setItemControls({
          type: 'TEXTBOX',
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
