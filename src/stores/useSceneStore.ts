import { create } from 'zustand';
import { NodeI, ConnectorI, GroupI } from '../validation/SceneSchema';
import { Coords } from '../utils/Coords';

interface UseSceneStore {
  nodes: NodeI[];
  connectors: ConnectorI[];
  groups: GroupI[];
  gridSize: Coords;
  actions: {};
}

const useSceneStore = create<UseSceneStore>((set, get) => ({
  nodes: [],
  connectors: [],
  groups: [],
  gridSize: new Coords(51, 51),
  actions: {}
}));

export const useGridSize = () => useSceneStore((state) => state.gridSize);
