import { SceneStore, UiStateStore } from 'src/types';

export interface State {
  scene: SceneStore;
  uiState: UiStateStore;
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
