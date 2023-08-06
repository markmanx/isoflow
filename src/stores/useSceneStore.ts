import { useCallback } from 'react';
import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';
import { NODE_DEFAULTS } from 'src/config';
import { Scene, SceneActions, Node, SceneItemTypeEnum } from 'src/types';
import { sceneInput } from 'src/validation/scene';
import { sceneInputtoScene } from 'src/utils';

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
    actions: {
      setScene: (scene) => {
        sceneInput.parse(scene);

        const newScene = sceneInputtoScene(scene);

        set(newScene);
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
