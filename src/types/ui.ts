import { Coords, Size } from './common';
import { SceneItem } from './scene';

export enum SidebarTypeEnum {
  SINGLE_NODE = 'SINGLE_NODE',
  PROJECT_SETTINGS = 'PROJECT_SETTINGS'
}

export type ItemControls =
  | {
      type: SidebarTypeEnum.SINGLE_NODE;
      nodeId: string;
    }
  | {
      type: SidebarTypeEnum.PROJECT_SETTINGS;
    }
  | null;

export interface Mouse {
  position: {
    screen: Coords;
    tile: Coords;
  };
  mousedown: {
    screen: Coords;
    tile: Coords;
  } | null;
  delta: {
    screen: Coords;
    tile: Coords;
  } | null;
}

// Begin mode types
export interface InteractionsDisabled {
  type: 'INTERACTIONS_DISABLED';
  showCursor: boolean;
}

export interface CursorMode {
  type: 'CURSOR';
  showCursor: boolean;
  mousedown: {
    items: SceneItem[];
    tile: Coords;
  } | null;
}

export interface PanMode {
  type: 'PAN';
  showCursor: boolean;
}

export interface LassoMode {
  type: 'LASSO'; // TODO: Put these into an enum
  showCursor: boolean;
  selection: {
    startTile: Coords;
    endTile: Coords;
    items: SceneItem[];
  };
  isDragging: boolean;
}

export interface DragItemsMode {
  type: 'DRAG_ITEMS';
  showCursor: boolean;
  items: SceneItem[];
}

export type Mode =
  | InteractionsDisabled
  | CursorMode
  | PanMode
  | DragItemsMode
  | LassoMode;
// End mode types

export type ContextMenu =
  | SceneItem
  | {
      type: 'EMPTY_TILE';
      position: Coords;
    }
  | null;

export interface Scroll {
  position: Coords;
  offset: Coords;
}

export interface UiState {
  interactionsEnabled: boolean;
  mode: Mode;
  itemControls: ItemControls;
  contextMenu: ContextMenu;
  zoom: number;
  scroll: Scroll;
  mouse: Mouse;
  rendererSize: Size;
}

export interface UiStateActions {
  setMode: (mode: Mode) => void;
  incrementZoom: () => void;
  decrementZoom: () => void;
  setZoom: (zoom: number) => void;
  setScroll: (scroll: Scroll) => void;
  setSidebar: (itemControls: ItemControls) => void;
  setContextMenu: (contextMenu: ContextMenu) => void;
  setMouse: (mouse: Mouse) => void;
  setRendererSize: (rendererSize: Size) => void;
  setInteractionsEnabled: (enabled: boolean) => void;
}
