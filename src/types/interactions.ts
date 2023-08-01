import { Draft } from 'immer';
import {
  Mode,
  Scroll,
  ContextMenu,
  ItemControls,
  Mouse,
  Scene
} from 'src/types';

export interface State {
  mode: Mode;
  mouse: Mouse;
  scroll: Scroll;
  scene: Scene;
  contextMenu: ContextMenu;
  itemControls: ItemControls;
}

export type InteractionReducerAction = (state: Draft<State>) => void;

export type InteractionReducer = {
  mousemove: InteractionReducerAction;
  mousedown: InteractionReducerAction;
  mouseup: InteractionReducerAction;
};
