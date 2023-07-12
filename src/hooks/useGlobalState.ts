import { create } from "zustand";
import { SceneI } from "../validation/SceneSchema";
import { Node } from "../renderer/elements/Node";
import { Coords } from "../renderer/elements/Coords";
import { Renderer } from "../renderer/Renderer";
import { OnSceneChange, SceneEventI } from "../types";

type SidebarState =
  | {
      type: "SINGLE_NODE";
      node: Node;
    }
  | {
      type: "PROJECT_SETTINGS";
    };

interface GlobalState {
  showContextMenuFor: Node | Coords | null;
  onSceneChange: OnSceneChange;
  setOnSceneChange: (onSceneChange: OnSceneChange) => void;
  initialScene: SceneI;
  setInitialScene: (scene: SceneI) => void;
  setSelectedElements: (elements: Node[]) => void;
  setSidebarState: (state: SidebarState | null) => void;
  renderer: Renderer;
  selectedElements: Node[];
  setRenderer: (renderer: Renderer) => void;
  onRendererEvent: (event: SceneEventI) => void;
  sidebarState: SidebarState | null;
  closeSidebar: () => void;
  closeContextMenu: () => void;
}

export const useGlobalState = create<GlobalState>((set, get) => ({
  showContextMenuFor: null,
  selectedElements: [],
  sidebarState: null,
  onSceneChange: () => {},
  setOnSceneChange: (onSceneChange) => set({ onSceneChange }),
  initialScene: {
    icons: [],
    nodes: [],
    connectors: [],
    groups: [],
  },
  closeContextMenu: () => {
    set({ showContextMenuFor: null });
  },
  setInitialScene: (scene) => {
    set({ initialScene: scene });
  },
  setSelectedElements: (elements: Node[]) => {
    const { renderer } = get();

    renderer.unfocusAll();
    elements.forEach((element) => {
      element.setFocus(true);
    });
    set({ selectedElements: elements });
  },
  setSidebarState: (val) => {
    set({ sidebarState: val });
  },
  closeSidebar: () => {
    const { setSidebarState, setSelectedElements } = get();

    setSidebarState(null);
    setSelectedElements([]);
  },
  renderer: new Renderer(document.createElement("div")),
  onRendererEvent: (event) => {
    const { setSelectedElements, renderer } = get();

    switch (event.type) {
      case "TILE_SELECTED":
        setSelectedElements([]);
        set({ showContextMenuFor: event.data.tile });
        break;
      case "NODES_SELECTED":
        setSelectedElements(event.data.nodes);

        if (event.data.nodes.length === 1) {
          const node = event.data.nodes[0];

          set({
            showContextMenuFor: event.data.nodes[0],
            sidebarState: { type: "SINGLE_NODE", node: event.data.nodes[0] },
          });
          renderer.scrollToTile(node.position);
        }
        break;
      case "NODE_REMOVED":
        setSelectedElements([]);
        set({
          showContextMenuFor: null,
          sidebarState: null,
        });
        break;
      case "NODE_MOVED":
        setSelectedElements([]);
        set({ showContextMenuFor: null });
        break;
      case "ZOOM_CHANGED":
        setSelectedElements([]);
        set({ showContextMenuFor: null });
        break;
      case "MULTISELECT_UPDATED":
        setSelectedElements(event.data.itemsSelected);
        break;
      default:
        break;
    }
  },
  setRenderer: (renderer) => {
    set({ renderer });
  },
}));
