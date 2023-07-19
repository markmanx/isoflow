import { InteractionReducer } from '../useInteractionManager';

export const Select: InteractionReducer = {
  mousemove: () => {},
  mousedown: () => {},
  mouseup: (state) => {},
  onTileOver: (state, { tile }) => {}
};
