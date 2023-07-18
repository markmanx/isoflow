import { create } from 'zustand';
import type { Item } from './useUiStateStore';

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

interface UseModeStore {
  mode: Mode;
  actions: {
    set: (mode: Mode) => void;
  };
}

const useModeStore = create<UseModeStore>((set) => ({
  mode: { type: 'CURSOR' },
  actions: {
    set: (mode) => {
      set({ mode });
    }
  }
}));

export const useMode = () => useModeStore((state) => state.mode);
export const useModeActions = () => useModeStore((state) => state.actions);
