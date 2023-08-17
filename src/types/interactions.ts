import { SceneStore, UiStateStore } from 'src/types';

export interface State {
  scene: SceneStore;
  uiState: UiStateStore;
  rendererRef: HTMLElement;
  isRendererInteraction: boolean;
}

export type ModeActionsAction = (state: State) => void;

export type ModeActions = {
  type: string;
  entry?: ModeActionsAction;
  exit?: ModeActionsAction;
  mousemove?: ModeActionsAction;
  mousedown?: ModeActionsAction;
  mouseup?: ModeActionsAction;
};
