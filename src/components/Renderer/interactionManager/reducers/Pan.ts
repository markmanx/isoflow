import { InteractionReducer } from '../useInteractionManager';
import { getTileFromMouse } from '../../utils/gridHelpers';

export const Pan: InteractionReducer = {
  mousemove: (state) => {
    if (state.mouse.mouseDownAt === null) return;

    state.scroll.position = state.mouse.delta
      ? state.scroll.position.add(state.mouse.delta)
      : state.scroll.position;
  },
  mousedown: (state) => {},
  mouseup: (state) => {}
};
