import { create } from 'zustand';
import { clamp } from '../utils';

const ZOOM_INCREMENT = 0.2;
export const MIN_ZOOM = 0.2;
export const MAX_ZOOM = 1;

const roundToOneDecimalPlace = (num: number) => Math.round(num * 10) / 10;

interface UseZoom {
  zoom: number;
  actions: {
    increment: () => void;
    decrement: () => void;
  };
}

const useZoomStore = create<UseZoom>((set, get) => ({
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
