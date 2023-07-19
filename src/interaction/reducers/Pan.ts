import { InteractionReducer } from '../types';

export const Pan: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mouse.mouseDownAt === null) return;

    draftState.scroll.position = draftState.mouse.delta
      ? draftState.scroll.position.add(draftState.mouse.delta)
      : draftState.scroll.position;
  },
  mousedown: () => {},
  mouseup: () => {},
  onTileOver: () => {}
};
