import { create } from "zustand";
import { SceneI } from "../validation/SceneSchema";
import { Renderer } from "../renderer/Renderer";

interface GlobalState {
  initialScene: SceneI;
  setInitialScene: (scene: SceneI) => void;
  selectedSideNavItem: number | null;
  setSelectedSideNavItem: (index: number) => void;
  closeSideNav: () => void;
  renderer: Renderer;
  setRenderer: (renderer: Renderer) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  initialScene: {
    icons: [],
    nodes: [],
    groups: [],
    connectors: [],
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
  renderer: new Renderer(document.createElement("div")),
  setRenderer: (renderer: Renderer) =>
    set((state) => {
      if (state.renderer) {
        state.renderer.destroy();
      }

      renderer.setZoom(state.renderer.zoom);

      return { renderer };
    }),
}));
