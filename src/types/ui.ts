import { Coords, Size } from './common';
import { SceneItem, Connector } from './scene';
import { IconInput } from './inputs';

export enum ItemControlsTypeEnum {
  SINGLE_NODE = 'SINGLE_NODE',
  PROJECT_SETTINGS = 'PROJECT_SETTINGS',
  PLACE_ELEMENT = 'PLACE_ELEMENT'
}

export type ItemControls =
  | {
      type: ItemControlsTypeEnum.SINGLE_NODE;
      nodeId: string;
    }
  | {
      type: ItemControlsTypeEnum.PROJECT_SETTINGS;
    }
  | {
      type: ItemControlsTypeEnum.PLACE_ELEMENT;
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
  type: 'LASSO';
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

export interface PlaceElementMode {
  type: 'PLACE_ELEMENT';
  showCursor: boolean;
  icon: IconInput | null;
}

export interface ConnectorMode {
  type: 'CONNECTOR';
  showCursor: boolean;
  connector: Connector | null;
}

export interface AreaToolMode {
  type: 'AREA_TOOL';
  showCursor: boolean;
  area: {
    from: Coords;
    to: Coords;
  } | null;
}

export type Mode =
  | InteractionsDisabled
  | CursorMode
  | PanMode
  | DragItemsMode
  | LassoMode
  | PlaceElementMode
  | ConnectorMode
  | AreaToolMode;
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
  debugMode: boolean;
}

export interface UiStateActions {
  setMode: (mode: Mode) => void;
  incrementZoom: () => void;
  decrementZoom: () => void;
  setZoom: (zoom: number) => void;
  setScroll: (scroll: Scroll) => void;
  setItemControls: (itemControls: ItemControls) => void;
  setContextMenu: (contextMenu: ContextMenu) => void;
  setMouse: (mouse: Mouse) => void;
  setRendererSize: (rendererSize: Size) => void;
  setInteractionsEnabled: (enabled: boolean) => void;
  setDebugMode: (enabled: boolean) => void;
}
