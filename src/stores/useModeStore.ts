import { create } from 'zustand';

type Mode =
  | {
      type: 'SELECT';
    }
  | {
      type: 'PAN';
    };

interface UseModeStore {
  mode: Mode;
  actions: {
    set: (mode: Mode) => void;
  };
}

const useModeStore = create<UseModeStore>((set) => ({
  mode: { type: 'SELECT' },
  actions: {
    set: (mode) => {
      set({ mode });
    }
  }
}));

export const useMode = () => useModeStore((state) => state.mode);
export const useModeActions = () => useModeStore((state) => state.actions);
