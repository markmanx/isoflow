import { create } from 'zustand';
import { Coords } from '../utils/Coords';

export interface Mouse {
  position: Coords;
  mouseDownAt: Coords | null;
  delta: Coords | null;
}

type UseMouseStore = Mouse & {
  actions: {
    set: ({ position, mouseDownAt }: Mouse) => void;
  };
};

const useMouseStore = create<UseMouseStore>((set) => ({
  position: new Coords(0, 0),
  mouseDownAt: null,
  delta: null,
  actions: {
    set: ({ position, mouseDownAt, delta }) => {
      set({ position, mouseDownAt, delta });
    }
  }
}));

export const useMouse = () =>
  useMouseStore(({ position, mouseDownAt, delta }) => ({
    position,
    mouseDownAt,
    delta
  }));
export const useMouseActions = () => useMouseStore((state) => state.actions);
