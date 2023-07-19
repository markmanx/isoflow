import { create } from 'zustand';
import { IconInput } from '../validation/SceneSchema';
import { Coords } from '../utils/Coords';

export interface Node {
  type: 'NODE';
  id: string;
  iconId: string;
  label?: string;
  position: Coords;
  isSelected: boolean;
}

export type Icon = IconInput;

export interface SceneItems {
  nodes: Node[];
}

export type Scene = SceneItems & {
  icons: IconInput[];
  gridSize: Coords;
};

export interface SceneActions {
  set: (scene: Scene) => void;
  setItems: (elements: SceneItems) => void;
}

export type UseSceneStore = Scene & {
  actions: SceneActions;
};

export const useSceneStore = create<UseSceneStore>((set) => ({
  nodes: [],
  icons: [],
  gridSize: new Coords(51, 51),
  actions: {
    set: (scene) => {
      set(scene);
    },
    setItems: (items: SceneItems) => {
      set({ nodes: items.nodes });
    }
  }
}));
