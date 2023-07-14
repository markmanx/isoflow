import { create } from 'zustand';
import gsap from 'gsap';
import { SceneI, NodeI } from '../../validation/SceneSchema';
import { Coords } from '../../utils/Coords';

interface Node {
  type: 'NODE';
  id: string;
}

export interface AppState {
  scene: SceneI;
  setScene: (scene: SceneI) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  selectedItems: Node[];
  setSelectedItems: (items: Node[]) => void;
  gridSize: Coords;
  setGridSize: (size: Coords) => void;
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
  cursor: {
    position: Coords;
  },
  setCursor: ({ position }: { position: Coords }) => void;
  mouse: {
    position: Coords;
    delta: Coords | null;
  };
  setMouse: ({
    position,
    delta,
  }: {
    position?: Coords;
    delta: Coords | null;
  }) => void;
  setNodes: (newNodes: (oldNodes: NodeI[]) => NodeI[]) => void;
}

export const useAppState = create<AppState>((set, get) => ({
  scene: {
    nodes: [],
    connectors: [],
    groups: [],
    icons: [],
  },
  setScene: (scene) => {
    set({ scene });
  },
  gridSize: new Coords(51, 51),
  setGridSize: (size) => {
    set({ gridSize: size });
  },
  zoom: 1,
  setZoom: (zoom) => {
    const tweenedZoom = { value: get().zoom };

    gsap.to(tweenedZoom, {
      duration: 0.25,
      value: zoom,
      onUpdate: () => {
        set({ zoom: tweenedZoom.value });
      },
    });
  },
  scroll: {
    position: new Coords(0, 0),
    offset: new Coords(0, 0),
  },
  setScroll: ({ position }) => {
    const tweenedPosition = get().scroll.position.clone();

    gsap.to(tweenedPosition, {
      duration: 0.25,
      ...position,
      onUpdate: () => {
        set({ scroll: { position: tweenedPosition, offset: new Coords(0, 0) } });
      },
    });
  },
  cursor: {
    position: new Coords(0, 0),
  },
  setCursor: ({ position }) => {
    const tweenedPosition = get().cursor.position.clone();

    gsap.to(tweenedPosition, {
      duration: 0.25,
      ...position,
      onUpdate: () => {
        set({ cursor: { position: tweenedPosition } });
      },
    });
  },
  selectedItems: [],
  setSelectedItems: (items: Node[]) => {
    set({ selectedItems: items });
  },
  mouse: {
    position: new Coords(0, 0),
    delta: null,
  },
  setMouse: ({ position, delta }) => {
    const { mouse } = get();

    set({
      mouse: {
        position: position ?? mouse.position,
        delta: delta ?? mouse.delta,
      },
    });
  },
  setNodes: (nodesFn) => {
    const { scene } = get();
    const newNodes = nodesFn(scene.nodes);
    set({ scene: { ...scene, nodes: newNodes } });
  },
}));
