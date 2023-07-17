import { create } from 'zustand';
import { clamp, roundToOneDecimalPlace } from '../utils';

const ZOOM_INCREMENT = 0.2;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1;

interface UseZoomStore {
  zoom: number;
  actions: {
    increment: () => void;
    decrement: () => void;
  };
}

const useZoomStore = create<UseZoomStore>((set, get) => ({
  zoom: 1,
  actions: {
    increment: () => {
      const { zoom } = get();
      const targetZoom = clamp(zoom + ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
      set({ zoom: roundToOneDecimalPlace(targetZoom) });
    },
    decrement: () => {
      const { zoom } = get();
      const targetZoom = clamp(zoom - ZOOM_INCREMENT, MIN_ZOOM, MAX_ZOOM);
      set({ zoom: roundToOneDecimalPlace(targetZoom) });
    }
  }
}));

export const useZoom = () => useZoomStore((state) => state.zoom);
export const useZoomActions = () => useZoomStore((state) => state.actions);
