import { Draft } from 'immer';
import {
  Mode,
  Scroll,
  ContextMenu,
  ItemControls,
  Mouse,
  Scene,
  SceneActions,
  UiStateActions
} from 'src/types';

export interface State {
  mode: Mode;
  mouse: Mouse;
  scroll: Scroll;
  scene: Scene;
  sceneActions: SceneActions;
  uiStateActions: UiStateActions;
  contextMenu: ContextMenu;
  itemControls: ItemControls;
  rendererRef: HTMLElement;
  isRendererInteraction: boolean;
}

export type InteractionReducerAction = (state: State) => void;

export type InteractionReducer = {
  type: string;
  entry?: InteractionReducerAction;
  exit?: InteractionReducerAction;
  mousemove?: InteractionReducerAction;
  mousedown?: InteractionReducerAction;
  mouseup?: InteractionReducerAction;
};
