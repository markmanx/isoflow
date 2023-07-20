import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';
import { IconInput } from '../validation/SceneSchema';
import { Coords } from '../utils/Coords';

export enum SceneItemTypeEnum {
  NODE = 'NODE'
}

export interface SceneItem {
  id: string;
  type: SceneItemTypeEnum;
}

export interface Node {
  type: SceneItemTypeEnum.NODE;
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
  updateNode: (id: string, updates: Partial<Node>) => void;
  getNodeById: (id: string) => Node | undefined;
  createNode: (position: Coords) => void;
}

export type UseSceneStore = Scene & {
  actions: SceneActions;
};

export const useSceneStore = create<UseSceneStore>((set, get) => ({
  nodes: [],
  icons: [],
  gridSize: new Coords(51, 51),
  actions: {
    set: (scene) => {
      set(scene);
    },
    setItems: (items: SceneItems) => {
      set({ nodes: items.nodes });
    },
    getNodeById: (id: string) => {
      const { nodes } = get();
      return nodes.find((node) => node.id === id);
    },
    updateNode: (id, updates) => {
      const { nodes } = get();
      const nodeIndex = nodes.findIndex((node) => node.id === id);

      if (nodeIndex === -1) {
        return;
      }

      const newNodes = produce(nodes, (draftState) => {
        draftState[nodeIndex] = { ...draftState[nodeIndex], ...updates };
      });

      set({ nodes: newNodes });
    },
    createNode: (position) => {
      const { nodes, icons } = get();
      const newNode: Node = {
        id: uuid(),
        type: SceneItemTypeEnum.NODE,
        iconId: icons[0].id,
        position,
        isSelected: false
      };

      set({ nodes: [...nodes, newNode] });
    }
  }
}));
