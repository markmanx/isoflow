import { Draft } from 'immer';
import { Mouse, Mode, Scroll, ContextMenu } from 'src/stores/useUiStateStore';
import { SceneItems } from 'src/stores/useSceneStore';
import { Coords } from 'src/utils/Coords';

export interface State {
  mouse: Mouse;
  mode: Mode;
  scroll: Scroll;
  gridSize: Coords;
  scene: SceneItems;
  contextMenu: ContextMenu;
}

export type InteractionReducerAction = (
  state: Draft<State>,
  payload: { prevMouse: Mouse }
) => void;

export type InteractionReducer = {
  mousemove: InteractionReducerAction;
  mousedown: InteractionReducerAction;
  mouseup: InteractionReducerAction;
};
