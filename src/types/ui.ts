import { Coords, EditorModeEnum, MainMenuOptions } from './common';
import { Connector, SceneItemReference, TileOriginEnum } from './scene';
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

interface ConnectorAnchorControls {
  type: 'CONNECTOR_ANCHOR';
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
  | ConnectorAnchorControls
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

export interface Scroll {
  position: Coords;
  offset: Coords;
}

export interface IconCollectionState {
  id?: string;
  isExpanded: boolean;
}

export type IconCollectionStateWithIcons = IconCollectionState & {
  icons: IconInput[];
};

export const DialogTypeEnum = {
  EXPORT_IMAGE: 'EXPORT_IMAGE'
} as const;

export interface UiState {
  mainMenuOptions: MainMenuOptions;
  editorMode: keyof typeof EditorModeEnum;
  iconCategoriesState: IconCollectionState[];
  mode: Mode;
  dialog: keyof typeof DialogTypeEnum | null;
  isMainMenuOpen: boolean;
  itemControls: ItemControls;
  zoom: number;
  scroll: Scroll;
  mouse: Mouse;
  rendererEl: HTMLDivElement | null;
  enableDebugTools: boolean;
}

export interface UiStateActions {
  setMainMenuOptions: (options: MainMenuOptions) => void;
  setEditorMode: (mode: keyof typeof EditorModeEnum) => void;
  setIconCategoriesState: (iconCategoriesState: IconCollectionState[]) => void;
  resetUiState: () => void;
  setMode: (mode: Mode) => void;
  incrementZoom: () => void;
  decrementZoom: () => void;
  setIsMainMenuOpen: (isOpen: boolean) => void;
  setDialog: (dialog: keyof typeof DialogTypeEnum | null) => void;
  setZoom: (zoom: number) => void;
  setScroll: (scroll: Scroll) => void;
  scrollToTile: (tile: Coords, origin?: TileOriginEnum) => void;
  setItemControls: (itemControls: ItemControls) => void;
  setMouse: (mouse: Mouse) => void;
  setRendererEl: (el: HTMLDivElement) => void;
  setenableDebugTools: (enabled: boolean) => void;
}

export type UiStateStore = UiState & {
  actions: UiStateActions;
};
