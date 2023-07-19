import { create } from 'zustand';
import { clamp, roundToOneDecimalPlace } from 'src/utils';
import { Coords } from 'src/utils/Coords';

const ZOOM_INCREMENT = 0.2;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1;

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
      items: Item[];
      hasMovedTile: boolean;
    };

export interface Mouse {
  position: Coords;
  mouseDownAt: Coords | null;
  delta: Coords | null;
}

export interface Scroll {
  position: Coords;
  offset: Coords;
}

export interface NodeItem {
  type: 'NODE';
  id: string;
}

export type Item =
  | NodeItem
  | {
      type: 'CONNECTOR';
      id: string;
    };

export interface UiState {
  mode: Mode;
  selectedItems: Item[];
  zoom: number;
  scroll: Scroll;
  mouse: Mouse;
}

export interface UiStateActions {
  setMode: (mode: Mode) => void;
  setSelectedItems: (items: Item[]) => void;
  incrementZoom: () => void;
  decrementZoom: () => void;
  setScroll: (scroll: Scroll) => void;
  setMouse: (mouse: Mouse) => void;
}

export type UseUiStateStore = UiState & {
  actions: UiStateActions;
};

export const useUiStateStore = create<UseUiStateStore>((set, get) => ({
  mode: { type: 'CURSOR' },
  scroll: {
    position: new Coords(0, 0),
    offset: new Coords(0, 0)
  },
  mouse: {
    position: new Coords(0, 0),
    mouseDownAt: null,
    delta: null
  },
  selectedItems: [],
  zoom: 1,
  actions: {
    setMode: (mode) => {
      set({ mode });
    },
    setSelectedItems: (items) => {
      set({ selectedItems: items });
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
    setMouse: ({ position, delta, mouseDownAt }) => {
      set({ mouse: { position, delta, mouseDownAt } });
    }
  }
}));
