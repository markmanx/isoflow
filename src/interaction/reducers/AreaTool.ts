import { InteractionReducer } from 'src/types';
import { produce } from 'immer';
import { generateId, hasMovedTile } from 'src/utils';
import { DEFAULT_COLOR } from 'src/config';

export const AreaTool: InteractionReducer = {
  type: 'AREA_TOOL',
  mousemove: (state) => {
    if (
      state.mode.type !== 'AREA_TOOL' ||
      !hasMovedTile(state.mouse) ||
      !state.mode.area ||
      !state.mouse.mousedown
    )
      return;

    const newMode = produce(state.mode, (draftState) => {
      if (!draftState.area) return;

      draftState.area.to = state.mouse.position.tile;
    });

    state.uiStateActions.setMode(newMode);
  },
  mousedown: (state) => {
    if (state.mode.type !== 'AREA_TOOL') return;

    const newMode = produce(state.mode, (draftState) => {
      draftState.area = {
        from: state.mouse.position.tile,
        to: state.mouse.position.tile
      };
    });

    state.uiStateActions.setMode(newMode);
  },
  mouseup: (state) => {
    if (state.mode.type !== 'AREA_TOOL' || !state.mode.area) return;

    state.sceneActions.createGroup({
      id: generateId(),
      color: DEFAULT_COLOR,
      from: state.mode.area.from,
      to: state.mode.area.to
    });

    state.uiStateActions.setMode({
      type: 'CURSOR',
      showCursor: true,
      mousedown: null
    });
  }
};
