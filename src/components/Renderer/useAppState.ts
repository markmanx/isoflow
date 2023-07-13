import { create } from "zustand";
import { SceneI } from "../../validation/SceneSchema";

interface Node {
  type: "NODE";
  id: string;
}

interface AppState {
  initialScene: SceneI;
  setInitialScene: (scene: SceneI) => void;
  selectedItems: Node[];
  setSelectedItems: (items: Node[]) => void;
}

export const useAppState = create<AppState>((set, get) => ({
  initialScene: {
    nodes: [],
    connectors: [],
    groups: [],
    icons: [],
  },
  setInitialScene: (scene) => {
    set({ initialScene: scene });
  },
  selectedItems: [],
  setSelectedItems: (items: Node[]) => {
    set({ selectedItems: items });
  },
}));
