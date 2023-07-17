import { create } from 'zustand';
import { Coords } from '../utils/Coords';

export interface Mouse {
  position: Coords;
  dragStart: Coords | null;
  delta: Coords | null;
}

type UseMouseStore = Mouse & {
  actions: {
    set: ({ position, dragStart }: Mouse) => void;
  };
};

const useMouseStore = create<UseMouseStore>((set) => ({
  position: new Coords(0, 0),
  dragStart: null,
  delta: null,
  actions: {
    set: ({ position, dragStart, delta }) => {
      set({ position, dragStart, delta });
    }
  }
}));

export const useMouse = () =>
  useMouseStore(({ position, dragStart, delta }) => ({
    position,
    dragStart,
    delta
  }));
export const useMouseActions = () => useMouseStore((state) => state.actions);
