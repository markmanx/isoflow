import { create } from "zustand";
import gsap from "gsap";
import { SceneI } from "../../validation/SceneSchema";
import { Coords } from "../../utils/Coords";

interface Node {
  type: "NODE";
  id: string;
}

interface AppState {
  initialScene: SceneI;
  setInitialScene: (scene: SceneI) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  selectedItems: Node[];
  setSelectedItems: (items: Node[]) => void;
  scroll: {
    position: Coords;
    offset: Coords;
  };
  setScroll: ({
    position,
    offset,
  }: {
    position?: Coords;
    offset?: Coords;
  }) => void;
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
  zoom: 1,
  setZoom: (zoom) => {
    set({ zoom });
  },
  scroll: {
    position: new Coords(0, 0),
    offset: new Coords(0, 0),
  },
  setScroll: ({ position }) => {
    const oldPosition = get().scroll.position.clone();

    gsap.to(oldPosition, {
      duration: 0.25,
      ...position,
      onUpdate: () => {
        set({ scroll: { position: oldPosition, offset: new Coords(0, 0) } });
      },
    });
  },
  selectedItems: [],
  setSelectedItems: (items: Node[]) => {
    set({ selectedItems: items });
  },
}));
