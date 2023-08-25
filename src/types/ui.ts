import { Coords, Size } from './common';
import { SceneItem, Connector, SceneItemReference } from './scene';
import { IconInput } from './inputs';

interface NodeControls {
  type: 'NODE';
  id: string;
}

interface ConnectorControls {
  type: 'CONNECTOR';
  id: string;
}

interface RectangleControls {
  type: 'RECTANGLE';
  id: string;
}

interface AddItemControls {
  type: 'ADD_ITEM';
}

export type ItemControls =
  | NodeControls
  | ConnectorControls
  | RectangleControls
  | AddItemControls
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
  mousedownItem: SceneItemReference | null;
}

export interface DragItemsMode {
  type: 'DRAG_ITEMS';
  showCursor: boolean;
  items: SceneItemReference[];
  isInitialMovement: Boolean;
}

export interface PanMode {
  type: 'PAN';
  showCursor: boolean;
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

export interface DrawRectangleMode {
  type: 'RECTANGLE.DRAW';
  showCursor: boolean;
  area: {
    from: Coords;
    to: Coords;
  } | null;
}

export interface ResizeRectangleMode {
  type: 'RECTANGLE.RESIZE';
  showCursor: boolean;
  id: string;
}

export type Mode =
  | InteractionsDisabled
  | CursorMode
  | PanMode
  | PlaceElementMode
  | ConnectorMode
  | DrawRectangleMode
  | ResizeRectangleMode
  | DragItemsMode;
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
  disableInteractions: boolean;
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
  setDisableInteractions: (isDisabled: boolean) => void;
  setDebugMode: (enabled: boolean) => void;
}

export type UiStateStore = UiState & {
  actions: UiStateActions;
};
