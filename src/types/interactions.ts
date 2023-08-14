import { Draft } from 'immer';
import {
  Mode,
  Scroll,
  ContextMenu,
  ItemControls,
  Mouse,
  Scene,
  SceneActions
} from 'src/types';

export interface State {
  mode: Mode;
  mouse: Mouse;
  scroll: Scroll;
  scene: Scene;
  sceneActions: SceneActions;
  contextMenu: ContextMenu;
  itemControls: ItemControls;
  rendererRef: HTMLElement;
}

export type InteractionReducerAction = (state: Draft<State>) => void;

export type InteractionReducer = {
  type: string;
  entry?: InteractionReducerAction;
  exit?: InteractionReducerAction;
  mousemove?: InteractionReducerAction;
  mousedown?: InteractionReducerAction;
  mouseup?: InteractionReducerAction;
};
