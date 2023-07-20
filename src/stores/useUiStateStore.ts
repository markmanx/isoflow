import { create } from 'zustand';
import { clamp, roundToOneDecimalPlace } from 'src/utils';
import { Coords } from 'src/utils/Coords';
import { Node, SceneItem } from 'src/stores/useSceneStore';

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

export type Mode =
  | {
      type: 'CURSOR';
    }
  | {
      type: 'SELECT';
    }
  | {
      type: 'PAN';
    }
  | {
      type: 'DRAG_ITEMS';
      items: {
        nodes: Pick<Node, 'id' | 'type'>[];
      };
      hasMovedTile: boolean;
    };

export type ContextMenu =
  | SceneItem
  | {
      type: 'EMPTY_TILE';
      position: Coords;
    }
  | null;

export interface Mouse {
  position: Coords;
  tile: Coords;
  mouseDownAt: Coords | null;
  delta: Coords | null;
}

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
  setMouse: (mouse: Mouse) => void;
  setSidebar: (itemControls: ItemControls) => void;
  setContextMenu: (contextMenu: ContextMenu) => void;
}

export type UseUiStateStore = UiState & {
  actions: UiStateActions;
};

export const useUiStateStore = create<UseUiStateStore>((set, get) => ({
  mode: { type: 'CURSOR' },
  itemControls: null,
  contextMenu: null,
  scroll: {
    position: new Coords(0, 0),
    offset: new Coords(0, 0)
  },
  mouse: {
    position: new Coords(0, 0),
    tile: new Coords(0, 0),
    mouseDownAt: null,
    delta: null
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
    setMouse: ({ position, delta, mouseDownAt, tile }) => {
      set({ mouse: { position, delta, mouseDownAt, tile } });
    },
    setSidebar: (itemControls) => {
      set({ itemControls });
    },
    setContextMenu: (contextMenu) => {
      set({ contextMenu });
    }
  }
}));
