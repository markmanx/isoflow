import { create } from 'zustand';
import { Coords } from '../utils/Coords';

interface UseScroll {
  position: Coords;
  offset: Coords;
  actions: {
    setPosition: (position: Coords) => void;
    setOffset: (offset: Coords) => void;
  };
}

const useScrollStore = create<UseScroll>((set) => ({
  position: new Coords(0, 0),
  offset: new Coords(0, 0),
  actions: {
    setPosition: (position: Coords) => {
      set({ position });
    },
    setOffset: (offset: Coords) => {
      set({ offset });
    }
  }
}));

export const useScrollPosition = () =>
  useScrollStore((state) => state.position);
export const useScrollOffset = () => useScrollStore((state) => state.offset);
export const useScrollActions = () => useScrollStore((state) => state.actions);
