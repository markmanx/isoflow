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

interface TextBoxControls {
  type: 'TEXTBOX';
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
  | TextBoxControls
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

// Mode types
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

export enum AnchorPositionsEnum {
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT'
}

export interface TransformRectangleMode {
  type: 'RECTANGLE.TRANSFORM';
  showCursor: boolean;
  id: string;
  selectedAnchor: AnchorPositionsEnum | null;
}

export interface TextBoxMode {
  type: 'TEXTBOX';
  showCursor: boolean;
}

export type Mode =
  | InteractionsDisabled
  | CursorMode
  | PanMode
  | PlaceElementMode
  | ConnectorMode
  | DrawRectangleMode
  | TransformRectangleMode
  | DragItemsMode
  | TextBoxMode;
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

export interface IconCategoryState {
  id?: string;
  isExpanded: boolean;
}

export type IconCategoryStateWithIcons = IconCategoryState & {
  icons: IconInput[];
};

export interface UiState {
  iconCategoriesState: IconCategoryState[];
  disableInteractions: boolean;
  mode: Mode;
  isMainMenuOpen: boolean;
  itemControls: ItemControls;
  contextMenu: ContextMenu;
  zoom: number;
  scroll: Scroll;
  mouse: Mouse;
  rendererSize: Size;
  debugMode: boolean;
}

export interface UiStateActions {
  setIconCategoriesState: (iconCategoriesState: IconCategoryState[]) => void;
  resetUiState: () => void;
  setMode: (mode: Mode) => void;
  incrementZoom: () => void;
  decrementZoom: () => void;
  setIsMainMenuOpen: (isOpen: boolean) => void;
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
