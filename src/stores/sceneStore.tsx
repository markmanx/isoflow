import React, { createContext, useRef, useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { produce } from 'immer';
import { Scene, SceneActions } from 'src/types';
import { sceneInput } from 'src/validation/scene';
import {
  getItemById,
  getConnectorPath,
  groupInputToGroup,
  sceneInputtoScene
} from 'src/utils';

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

          return newScene;
        },

        updateScene: (scene) => {
          set({
            nodes: scene.nodes,
            connectors: scene.connectors,
            groups: scene.groups
          });
        },

        updateNode: (id, updates, scene) => {
          const newScene = produce(scene ?? get(), (draftState) => {
            const { item: node, index } = getItemById(draftState.nodes, id);

            draftState.nodes[index] = {
              ...node,
              ...updates
            };

            draftState.connectors.forEach((connector, i) => {
              const needsUpdate = connector.anchors.find((anchor) => {
                return anchor.type === 'NODE' && anchor.id === id;
              });

              if (needsUpdate) {
                draftState.connectors[i].path = getConnectorPath({
                  anchors: connector.anchors,
                  nodes: draftState.nodes
                });
              }
            });
          });

          set({ nodes: newScene.nodes, connectors: newScene.connectors });

          return newScene;
        },

        createGroup: (group) => {
          const newScene = produce(get(), (draftState) => {
            draftState.groups.push(groupInputToGroup(group));
          });

          set({ groups: newScene.groups });

          return newScene;
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
