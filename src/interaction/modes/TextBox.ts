import { setWindowCursor, generateId } from 'src/utils';
import { ModeActions } from 'src/types';
import { TEXTBOX_DEFAULTS } from 'src/config';

export const TextBox: ModeActions = {
  entry: () => {
    setWindowCursor('crosshair');
  },
  exit: () => {
    setWindowCursor('default');
  },
  mousemove: () => {},
  mouseup: ({ scene, uiState, isRendererInteraction }) => {
    if (!isRendererInteraction) return;

    const id = generateId();

    scene.actions.createTextBox({
      ...TEXTBOX_DEFAULTS,
      id,
      tile: uiState.mouse.position.tile
    });

    uiState.actions.setMode({
      type: 'CURSOR',
      showCursor: true,
      mousedownItem: null
    });

    uiState.actions.setItemControls({
      type: 'TEXTBOX',
      id
    });
  }
};
