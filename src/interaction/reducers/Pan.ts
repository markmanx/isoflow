import { InteractionReducer } from '../types';

export const Pan: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'PAN') return;

    if (draftState.mouse.mousedown !== null) {
      draftState.scroll.position = draftState.mouse.delta?.screen
        ? draftState.scroll.position.add(draftState.mouse.delta.screen)
        : draftState.scroll.position;
    }
  },
  mousedown: () => {},
  mouseup: () => {}
};
