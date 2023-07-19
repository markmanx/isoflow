import { create } from 'zustand';
import {
  NodeSchemaI,
  ConnectorSchemaI,
  GroupSchemaI,
  IconI,
  SceneI
} from '../validation/SceneSchema';
import { Coords } from '../utils/Coords';

export interface Scene {
  nodes: NodeSchemaI[];
  connectors: ConnectorSchemaI[];
  groups: GroupSchemaI[];
  icons: IconI[];
  gridSize: Coords;
}

export type UseSceneStore = Scene & {
  actions: {
    set: (scene: SceneI) => void;
    getNodeById: (id: string) => NodeSchemaI | undefined;
  };
};

export const useSceneStore = create<UseSceneStore>((set, get) => ({
  nodes: [],
  connectors: [],
  groups: [],
  icons: [],
  gridSize: new Coords(51, 51),
  actions: {
    set: (scene) => {
      set(scene);
    },
    getNodeById: (id: string) => get().nodes.find((node) => node.id === id)
  }
}));

export const useScene = () =>
  useSceneStore(
    ({ nodes, connectors, groups, icons }): SceneI => ({
      nodes,
      connectors,
      groups,
      icons
    })
  );
export const useGridSize = () => useSceneStore((state) => state.gridSize);
export const useSceneActions = () => useSceneStore((state) => state.actions);
