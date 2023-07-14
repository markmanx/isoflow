import { create } from 'zustand';
import { SceneI } from '../validation/SceneSchema';
import { Node } from '../renderer/elements/Node';
import { Coords } from '../renderer/elements/Coords';
import { Renderer } from '../renderer/Renderer';
import { OnSceneChange, SceneEventI } from '../types';

interface GlobalState {
  showContextMenuFor: Node | Coords | null;
  onSceneChange: OnSceneChange;
  setOnSceneChange: (onSceneChange: OnSceneChange) => void;
  initialScene: SceneI;
  setInitialScene: (scene: SceneI) => void;
  selectedSideNavItem: number | null;
  setSelectedElements: (elements: Node[]) => void;
  setSelectedSideNavItem: (index: number) => void;
  closeSideNav: () => void;
  selectedElements: Node[];
  setRenderer: (containerEl: HTMLDivElement) => void;
  onRendererEvent: (event: SceneEventI) => void;
}

export const useGlobalState = create<GlobalState>((set, get) => ({
  showContextMenuFor: null,
  selectedElements: [],
  selectedSideNavItem: null,
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
  setSelectedElements: (elements: Node[]) => {
    // const { renderer } = get();
    // renderer.unfocusAll();
    // elements.forEach((element) => {
    //   element.setFocus(true);
    // });
    // set({ selectedElements: elements });
  },
  setSelectedSideNavItem: (val) => {
    set({ selectedSideNavItem: val });
  },
  closeSideNav: () => {
    set({ selectedSideNavItem: null });
  },
  onRendererEvent: (event) => {
    const { setSelectedElements } = get();

    switch (event.type) {
      case 'TILE_SELECTED':
        setSelectedElements([]);
        set({ showContextMenuFor: event.data.tile });
        break;
      case 'NODES_SELECTED':
        setSelectedElements(event.data.nodes);

        if (event.data.nodes.length === 1) {
          set({ showContextMenuFor: event.data.nodes[0] });
        }
        break;
      case 'NODE_REMOVED':
        setSelectedElements([]);
        set({
          showContextMenuFor: null,
          selectedSideNavItem: null,
        });
        break;
      case 'NODE_MOVED':
        setSelectedElements([]);
        set({ showContextMenuFor: null });
        break;
      case 'ZOOM_CHANGED':
        setSelectedElements([]);
        set({ showContextMenuFor: null });
        break;
      case 'MULTISELECT_UPDATED':
        setSelectedElements(event.data.itemsSelected);
        break;
      default:
        break;
    }
  },
  setRenderer: (containerEl) => {
    // set((state) => {
    //   if (state.renderer) {
    //     state.renderer.destroy();
    //   }
    //   const scene = state.initialScene;
    //   const renderer = new Renderer(containerEl);
    //   renderer.setEventHandler(state.onRendererEvent);
    //   renderer.loadScene(scene);
    //   renderer.setZoom(state.renderer.zoom);
    //   return { renderer };
    // });
  },
}));
