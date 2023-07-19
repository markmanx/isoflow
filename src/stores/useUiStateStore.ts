import { create } from 'zustand';

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

export type UseUiStore = {
  selectedItems: Item[];
  actions: {
    setSelectedItems: (items: Item[]) => void;
  };
};

const useUiStateStore = create<UseUiStore>((set) => ({
  selectedItems: [],
  actions: {
    setSelectedItems: (items) => {
      set({ selectedItems: items });
    }
  }
}));

export const useUiState = () =>
  useUiStateStore((state) => ({
    selectedItems: state.selectedItems
  }));
export const useUiStateActions = () =>
  useUiStateStore((state) => state.actions);
