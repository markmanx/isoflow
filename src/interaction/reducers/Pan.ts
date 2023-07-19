import { InteractionReducer } from '../useToolEventToMouseEvent';

export const Pan: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mouse.mouseDownAt === null) return;

    draftState.scroll = draftState.mouse.delta
      ? draftState.scroll.add(draftState.mouse.delta)
      : draftState.scroll;
  },
  mousedown: () => {},
  mouseup: () => {},
  onTileOver: () => {}
};
