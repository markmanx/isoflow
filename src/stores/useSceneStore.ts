import { useCallback } from 'react';
import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';
import { NODE_DEFAULTS } from 'src/utils/defaults';
import { IconInput } from '../validation/SceneSchema';
import { Coords } from '../utils/Coords';

export enum SceneItemTypeEnum {
  NODE = 'NODE'
}

export interface Node {
  type: SceneItemTypeEnum.NODE;
  id: string;
  iconId: string;
  color: string;
  label: string;
  labelHeight: number;
  position: Coords;
  isSelected: boolean;
}

export type Icon = IconInput;

export interface SceneItem {
  id: string;
  type: SceneItemTypeEnum;
}

export interface SortedSceneItems {
  nodes: Node[];
}

export type Scene = SortedSceneItems & {
  icons: IconInput[];
  gridSize: Coords;
};

export interface SceneActions {
  set: (scene: Scene) => void;
  setItems: (elements: SortedSceneItems) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
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
    setItems: (items: SortedSceneItems) => {
      set({ nodes: items.nodes });
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
        ...NODE_DEFAULTS,
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

export const useNodeHooks = () => {
  const nodes = useSceneStore((state) => state.nodes);

  const useGetNodeById = useCallback(
    (id: string) => nodes.find((node) => node.id === id),
    [nodes]
  );

  return { useGetNodeById };
};
