import { create } from 'zustand';
import { clamp, roundToOneDecimalPlace, CoordsUtils } from 'src/utils';
import { Coords } from 'src/types';
import { SceneItem, Node } from 'src/stores/useSceneStore';

// TODO: Move into the defaults file
const ZOOM_INCREMENT = 0.2;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1;

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

// TODO: Extract modes into own file for simplicity
export interface CursorMode {
  type: 'CURSOR';
  showCursor: boolean;
  mousedown: {
    items: { nodes: Node[] };
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
    items: Node[];
  };
  isDragging: boolean;
}

export interface DragItemsMode {
  type: 'DRAG_ITEMS';
  showCursor: boolean;
  items: { nodes: Node[] };
}

export type Mode = CursorMode | PanMode | DragItemsMode | LassoMode;

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
  mode: Mode;
  itemControls: ItemControls;
  contextMenu: ContextMenu;
  zoom: number;
  scroll: Scroll;
  mouse: Mouse;
}

export interface UiStateActions {
  setMode: (mode: Mode) => void;
  incrementZoom: () => void;
  decrementZoom: () => void;
  setScroll: (scroll: Scroll) => void;
  setSidebar: (itemControls: ItemControls) => void;
  setContextMenu: (contextMenu: ContextMenu) => void;
  setMouse: (mouse: Mouse) => void;
}

export type UseUiStateStore = UiState & {
  actions: UiStateActions;
};

export const useUiStateStore = create<UseUiStateStore>((set, get) => {
  return {
    mode: {
      type: 'CURSOR',
      showCursor: true,
      mousedown: null
    },
    mouse: {
      position: { screen: CoordsUtils.zero(), tile: CoordsUtils.zero() },
      mousedown: null,
      delta: null
    },
    itemControls: null,
    contextMenu: null,
    scroll: {
      position: { x: 0, y: 0 },
      offset: { x: 0, y: 0 }
    },
    zoom: 1,
    actions: {
      setMode: (mode) => {
        set({ mode });
      },
      incrementZoom: () => {
        const { zoom } = get();
        const targetZoom = clamp(zoom + ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
        set({ zoom: roundToOneDecimalPlace(targetZoom) });
      },
      decrementZoom: () => {
        const { zoom } = get();
        const targetZoom = clamp(zoom - ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
        set({ zoom: roundToOneDecimalPlace(targetZoom) });
      },
      setScroll: ({ position, offset }) => {
        set({ scroll: { position, offset: offset ?? get().scroll.offset } });
      },
      setSidebar: (itemControls) => {
        set({ itemControls });
      },
      setContextMenu: (contextMenu) => {
        set({ contextMenu });
      },
      setMouse: (mouse) => {
        set({ mouse });
      }
    }
  };
});
