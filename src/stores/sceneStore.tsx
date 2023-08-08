import React, { createContext, useRef, useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { v4 as uuid } from 'uuid';
import { produce } from 'immer';
import { NODE_DEFAULTS } from 'src/config';
import { Scene, SceneActions, Node, SceneItemTypeEnum } from 'src/types';
import { sceneInput } from 'src/validation/scene';
import { sceneInputtoScene } from 'src/utils';

interface Actions {
  actions: SceneActions;
}

type SceneStore = Scene & Actions;

const initialState = () => {
  return createStore<SceneStore>((set, get) => {
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
};

const SceneContext = createContext<ReturnType<typeof initialState> | null>(
  null
);

interface ProviderProps {
  children: React.ReactNode;
}

// TODO: Typings below are pretty gnarly due to the way Zustand works.
// see https://github.com/pmndrs/zustand/discussions/1180#discussioncomment-3439061
export const SceneProvider = ({ children }: ProviderProps) => {
  const storeRef = useRef<ReturnType<typeof initialState>>();

  if (!storeRef.current) {
    storeRef.current = initialState();
  }

  return (
    <SceneContext.Provider value={storeRef.current}>
      {children}
    </SceneContext.Provider>
  );
};

export function useSceneStore<T>(
  selector: (state: SceneStore) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  const store = useContext(SceneContext);

  if (store === null) {
    throw new Error('Missing provider in the tree');
  }

  const value = useStore(store, selector, equalityFn);
  return value;
}
