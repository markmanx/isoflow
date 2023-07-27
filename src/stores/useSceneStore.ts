import { useCallback } from 'react';
import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';
import { NODE_DEFAULTS } from 'src/utils/defaults';
import { IconInput } from '../validation/SceneInput';
import { Coords } from '../utils/Coords';

// TODO: Move all types into a types file for easier access and less mental load over where to look
export enum SceneItemTypeEnum {
  NODE = 'NODE',
  CONNECTOR = 'CONNECTOR',
  GROUP = 'GROUP'
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

export interface Connector {
  type: SceneItemTypeEnum.CONNECTOR;
  id: string;
  color: string;
  from: string;
  to: string;
}

export interface Group {
  type: SceneItemTypeEnum.GROUP;
  id: string;
  nodeIds: string[];
}

export type Icon = IconInput;

export interface SceneItem {
  id: string;
  type: SceneItemTypeEnum;
}

// TODO: Is this needed, or do we just expost a getNodesFromTile() function?
export interface SortedSceneItems {
  // TODO: Decide on whether to make a Map instead of an array for easier lookup
  nodes: Node[];
  groups: Group[];
  connectors: Connector[];
}

// TODO: This typing is super confusing to work with
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

// TODO: Optimise lookup time by having a store of tile coords and what items they contain
export const useSceneStore = create<UseSceneStore>((set, get) => {
  return {
    nodes: [],
    connectors: [],
    groups: [],
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
        const nodeIndex = nodes.findIndex((node) => {
          return node.id === id;
        });

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
  };
});

export const useNodeHooks = () => {
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });

  const useGetNodeById = useCallback(
    (id: string) => {
      return nodes.find((node) => {
        return node.id === id;
      });
    },
    [nodes]
  );

  return { useGetNodeById };
};
