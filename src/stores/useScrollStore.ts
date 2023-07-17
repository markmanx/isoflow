import { create } from 'zustand';
import { Coords } from '../utils/Coords';

export interface Scroll {
  position: Coords;
  offset: Coords;
}

type UseScrollStore = Scroll & {
  actions: {
    setPosition: (position: Coords) => void;
    setOffset: (offset: Coords) => void;
  };
};

const useScrollStore = create<UseScrollStore>((set) => ({
  position: new Coords(0, 0),
  offset: new Coords(0, 0),
  actions: {
    setPosition: (position) => {
      set({ position });
    },
    setOffset: (offset) => {
      set({ offset });
    }
  }
}));

export const useScroll = () =>
  useScrollStore(({ position, offset }) => ({ position, offset }));
export const useScrollActions = () => useScrollStore((state) => state.actions);
