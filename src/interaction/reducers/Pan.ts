import { InteractionReducer } from '../useInteractionManager';

export const Pan: InteractionReducer = {
  mousemove: (state) => {
    if (state.mouse.mouseDownAt === null) return;

    state.scroll = state.mouse.delta
      ? state.scroll.add(state.mouse.delta)
      : state.scroll;
  },
  mousedown: () => {},
  mouseup: () => {},
  onTileOver: () => {}
};
