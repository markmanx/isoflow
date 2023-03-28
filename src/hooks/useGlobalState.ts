import { create } from "zustand";
import { SceneI } from "../validation/SceneSchema";
import { Renderer } from "../renderer/Renderer";
import { OnSceneChange } from "../renderer/types";
import { getRandom } from "../utils";

interface GlobalState {
  onSceneChange: OnSceneChange;
  setOnSceneChange: (onSceneChange: OnSceneChange) => void;
  initialScene: SceneI;
  setInitialScene: (scene: SceneI) => void;
  selectedSideNavItem: number | null;
  setSelectedSideNavItem: (index: number) => void;
  closeSideNav: () => void;
  renderer: Renderer;
  setRenderer: (renderer: Renderer) => void;
}

export const useGlobalState = create<GlobalState>((set, get) => ({
  onSceneChange: () => {},
  setOnSceneChange: (onSceneChange) => set({ onSceneChange }),
  initialScene: {
    icons: [],
    nodes: [],
    connectors: [],
    groups: [],
  },
  setInitialScene: (scene) => {
    set({ initialScene: scene });
  },
  selectedSideNavItem: null,
  setSelectedSideNavItem: (val) => {
    set({ selectedSideNavItem: val });
  },
  closeSideNav: () => {
    set({ selectedSideNavItem: null });
  },
  renderer: new Renderer(document.createElement("div"), () => {}),
  setRenderer: (renderer: Renderer) =>
    set((state) => {
      if (state.renderer) {
        state.renderer.destroy();
      }

      const scene = state.initialScene;

      renderer.loadScene(scene);
      renderer.setZoom(state.renderer.zoom);

      // setInterval(() => {
      //   const node = renderer.sceneElements.nodes.getNodeById("Node1");
      //   node?.moveTo(getRandom(-5, 5), getRandom(-5, 5));
      // }, 1000);

      return { renderer };
    }),
}));
