import { InteractionReducer } from 'src/types';
import { generateId } from 'src/utils';
import { DEFAULT_COLOR } from 'src/config';

export const AreaTool: InteractionReducer = {
  type: 'AREA_TOOL',
  mousemove: (draftState) => {
    if (
      draftState.mode.type !== 'AREA_TOOL' ||
      !draftState.mode.area ||
      !draftState.mouse.mousedown
    )
      return;

    draftState.mode.area.to = draftState.mouse.position.tile;
  },
  mousedown: (draftState) => {
    if (draftState.mode.type !== 'AREA_TOOL') return;

    draftState.mode.area = {
      from: draftState.mouse.position.tile,
      to: draftState.mouse.position.tile
    };
  },
  mouseup: (draftState) => {
    if (draftState.mode.type !== 'AREA_TOOL' || !draftState.mode.area) return;

    const newGroups = draftState.sceneActions.createGroup({
      id: generateId(),
      color: DEFAULT_COLOR,
      from: draftState.mode.area.from,
      to: draftState.mode.area.to
    });

    draftState.scene.groups = newGroups.groups;
    draftState.mode.area = null;
  }
};
