import React, { createContext, useRef, useContext } from 'react';
import { createStore, useStore } from 'zustand';
import { produce } from 'immer';
import { SceneStore } from 'src/types';
import { sceneInput } from 'src/validation/scene';
import {
  getItemById,
  getConnectorPath,
  rectangleInputToRectangle,
  connectorInputToConnector,
  sceneInputtoScene,
  nodeInputToNode
} from 'src/utils';

const initialState = () => {
  return createStore<SceneStore>((set, get) => {
    return {
      nodes: [],
      connectors: [],
      rectangles: [],
      icons: [],
      actions: {
        setScene: (scene) => {
          sceneInput.parse(scene);

          const newScene = sceneInputtoScene(scene);

          set(newScene);
        },

        updateScene: (scene) => {
          set({
            nodes: scene.nodes,
            connectors: scene.connectors,
            rectangles: scene.rectangles
          });
        },

        createNode: (node) => {
          const newScene = produce(get(), (draftState) => {
            draftState.nodes.push(nodeInputToNode(node));
          });

          set({ nodes: newScene.nodes });
        },

        updateNode: (id, updates) => {
          const newScene = produce(get(), (draftState) => {
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
        },

        deleteNode: (id: string) => {
          const newScene = produce(get(), (draftState) => {
            const { index } = getItemById(draftState.nodes, id);

            draftState.nodes.splice(index, 1);

            draftState.connectors = draftState.connectors.filter(
              (connector) => {
                return !connector.anchors.find((anchor) => {
                  return anchor.type === 'NODE' && anchor.id === id;
                });
              }
            );
          });

          set({ nodes: newScene.nodes, connectors: newScene.connectors });
        },

        updateConnector: (id, updates) => {
          const newScene = produce(get(), (draftState) => {
            const { item: connector, index } = getItemById(
              draftState.connectors,
              id
            );

            draftState.connectors[index] = {
              ...connector,
              ...updates
            };
          });

          set({ connectors: newScene.connectors });
        },

        updateRectangle: (id, updates) => {
          const newScene = produce(get(), (draftState) => {
            const { item: rectangle, index } = getItemById(
              draftState.rectangles,
              id
            );

            draftState.rectangles[index] = {
              ...rectangle,
              ...updates
            };
          });

          set({ rectangles: newScene.rectangles });
        },

        deleteConnector: (id: string) => {
          const newScene = produce(get(), (draftState) => {
            const { index } = getItemById(draftState.connectors, id);

            draftState.connectors.splice(index, 1);
          });

          set({ connectors: newScene.connectors });
        },

        deleteRectangle: (id: string) => {
          const newScene = produce(get(), (draftState) => {
            const { index } = getItemById(draftState.rectangles, id);

            draftState.rectangles.splice(index, 1);
          });

          set({ rectangles: newScene.rectangles });
        },

        createConnector: (connector) => {
          const newScene = produce(get(), (draftState) => {
            draftState.connectors.push(
              connectorInputToConnector(connector, draftState.nodes)
            );
          });

          set({ connectors: newScene.connectors });
        },

        createRectangle: (rectangle) => {
          const newScene = produce(get(), (draftState) => {
            draftState.rectangles.push(rectangleInputToRectangle(rectangle));
          });

          set({ rectangles: newScene.rectangles });
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
