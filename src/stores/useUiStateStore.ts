import { create } from 'zustand';
import { clamp, roundToOneDecimalPlace, CoordsUtils } from 'src/utils';
import { UiState, UiStateActions } from 'src/types';

// TODO: Move into the defaults file
const ZOOM_INCREMENT = 0.2;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1;

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
