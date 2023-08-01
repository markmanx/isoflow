import { CoordsUtils } from 'src/utils';
import { InteractionReducer } from 'src/types';

export const Pan: InteractionReducer = {
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
  mousedown: () => {},
  mouseup: () => {}
};
