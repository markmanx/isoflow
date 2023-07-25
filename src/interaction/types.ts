import { Draft } from 'immer';
import {
  Mode,
  Scroll,
  ContextMenu,
  ItemControls,
  Mouse
} from 'src/stores/useUiStateStore';
import { SortedSceneItems } from 'src/stores/useSceneStore';
import { Coords } from 'src/utils/Coords';

export interface State {
  mode: Mode;
  mouse: Mouse;
  scroll: Scroll;
  gridSize: Coords;
  scene: SortedSceneItems;
  contextMenu: ContextMenu;
  itemControls: ItemControls;
}

export type InteractionReducerAction = (state: Draft<State>) => void;

export type InteractionReducer = {
  mousemove: InteractionReducerAction;
  mousedown: InteractionReducerAction;
  mouseup: InteractionReducerAction;
};
