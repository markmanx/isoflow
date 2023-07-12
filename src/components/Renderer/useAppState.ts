import { create } from "zustand";

interface Node {
  type: "NODE";
  id: string;
}

interface AppState {
  selectedItems: Node[];
  setSelectedItems: (items: Node[]) => void;
}

export const useAppState = create<AppState>((set, get) => ({
  selectedItems: [],
  setSelectedItems: (items: Node[]) => {
    set({ selectedItems: items });
  },
}));
