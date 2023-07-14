import type { PartialAppState } from './useInterfaceManager';
import { getTileFromMouse, getTilePosition } from '../utils/gridHelpers';

type Action = |
{ type: 'MOUSE_MOVE', payload: { mouse: PartialAppState['mouse'] } };

export const selectReducer = (action: Action, state: PartialAppState) => {
  const newState = { mouse: { position: state.mouse.position.clone(), delta: state.mouse.delta?.clone() ?? null }, cursor: { position: state.cursor.position.clone() } };
  const tile = getTileFromMouse({
    gridSize: state.gridSize,
    mouse: action.payload.mouse.position,
    scroll: state.scroll.position,
  });

  switch (action.type) {
    case 'MOUSE_MOVE':
      newState.mouse = action.payload.mouse;
      newState.cursor.position = getTilePosition(tile);

      return newState;
    default:
      return newState;
  }
};
