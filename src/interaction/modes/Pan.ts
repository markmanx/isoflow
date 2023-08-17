import { produce } from 'immer';
import { CoordsUtils, setWindowCursor } from 'src/utils';
import { ModeActions } from 'src/types';

export const Pan: ModeActions = {
  type: 'PAN',
  entry: () => {
    setWindowCursor('grab');
  },
  exit: () => {
    setWindowCursor('default');
  },
  mousemove: ({ uiState }) => {
    if (uiState.mode.type !== 'PAN') return;

    if (uiState.mouse.mousedown !== null) {
      const newScroll = produce(uiState.scroll, (draftState) => {
        draftState.position = uiState.mouse.delta?.screen
          ? CoordsUtils.add(draftState.position, uiState.mouse.delta.screen)
          : draftState.position;
      });

      uiState.actions.setScroll(newScroll);
    }
  },
  mousedown: () => {
    setWindowCursor('grabbing');
  },
  mouseup: () => {
    setWindowCursor('grab');
  }
};
