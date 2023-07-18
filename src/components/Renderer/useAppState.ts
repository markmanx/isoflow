import { create } from 'zustand';
import { SceneI, NodeSchemaI } from '../../validation/SceneSchema';
import { Coords } from '../../utils/Coords';

interface Node {
  type: 'NODE';
  id: string;
}

type Mode =
  | {
      type: 'SELECT';
    }
  | {
      type: 'PAN';
    };

export interface AppState {
  scene: SceneI;
  setScene: (scene: SceneI) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
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
    offset
  }: {
    position?: Coords;
    offset?: Coords;
  }) => void;
  cursor: {
    position: Coords;
  };
  setCursor: ({ position }: { position: Coords }) => void;
  mouse: {
    position: Coords;
    delta: Coords | null;
  };
  setMouse: ({
    position,
    delta
  }: {
    position?: Coords;
    delta: Coords | null;
  }) => void;
  setNodes: (newNodes: (oldNodes: NodeSchemaI[]) => NodeSchemaI[]) => void;
}

export const useAppState = create<AppState>((set, get) => ({
  scene: {
    nodes: [],
    connectors: [],
    groups: [],
    icons: []
  },
  setScene: (scene) => {
    set({ scene });
  },
  mode: { type: 'SELECT' },
  setMode: (mode: Mode) => {
    set({ mode });
  },
  gridSize: new Coords(51, 51),
  setGridSize: (size) => {
    set({ gridSize: size });
  },
  zoom: 1,
  setZoom: (zoom) => {
    set({ zoom });
  },
  scroll: {
    position: new Coords(0, 0),
    offset: new Coords(0, 0)
  },
  setScroll: ({ position, offset }) => {
    const { position: oldPosition, offset: oldOffset } = get().scroll;

    set({
      scroll: { position: position ?? oldPosition, offset: offset ?? oldOffset }
    });
  },
  cursor: {
    position: new Coords(0, 0)
  },
  setCursor: ({ position }) => {
    set({ cursor: { position } });
  },
  selectedItems: [],
  setSelectedItems: (items: Node[]) => {
    set({ selectedItems: items });
  },
  mouse: {
    position: new Coords(0, 0),
    delta: null
  },
  setMouse: ({ position, delta }) => {
    const { mouse } = get();

    set({
      mouse: {
        position: position ?? mouse.position,
        delta: delta ?? mouse.delta
      }
    });
  },
  setNodes: (nodesFn) => {
    const { scene } = get();
    const newNodes = nodesFn(scene.nodes);
    set({ scene: { ...scene, nodes: newNodes } });
  }
}));
