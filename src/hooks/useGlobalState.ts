import { create } from "zustand";
import { IconI } from "../validation/SceneSchema";
import { Renderer } from "../renderer/Renderer";

interface GlobalState {
  icons: IconI[];
  selectedSideNavItem: number | null;
  setSelectedSideNavItem: (index: number) => void;
  closeSideNav: () => void;
  renderer: Renderer;
  setRenderer: (renderer: Renderer) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  icons: [],
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
