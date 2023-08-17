import { produce } from 'immer';
import { CoordsUtils, setWindowCursor } from 'src/utils';
import { InteractionReducer } from 'src/types';

export const Pan: InteractionReducer = {
  type: 'PAN',
  entry: () => {
    setWindowCursor('grab');
  },
  exit: () => {
    setWindowCursor('default');
  },
  mousemove: (state) => {
    if (state.mode.type !== 'PAN') return;

    if (state.mouse.mousedown !== null) {
      const newScroll = produce(state.scroll, (draftState) => {
        draftState.position = state.mouse.delta?.screen
          ? CoordsUtils.add(draftState.position, state.mouse.delta.screen)
          : draftState.position;
      });

      state.uiStateActions.setScroll(newScroll);
    }
  },
  mousedown: () => {
    setWindowCursor('grabbing');
  },
  mouseup: () => {
    setWindowCursor('grab');
  }
};
