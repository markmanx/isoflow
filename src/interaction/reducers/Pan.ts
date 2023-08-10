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
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'PAN') return;

    if (draftState.mouse.mousedown !== null) {
      draftState.scroll.position = draftState.mouse.delta?.screen
        ? CoordsUtils.add(
            draftState.scroll.position,
            draftState.mouse.delta.screen
          )
        : draftState.scroll.position;
    }
  },
  mousedown: () => {
    setWindowCursor('grabbing');
  },
  mouseup: () => {
    setWindowCursor('grab');
  }
};
