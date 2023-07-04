import { Renderer } from "./renderer/Renderer";
import type { ModeManager } from "./modes/ModeManager";
import type { Node } from "./renderer/elements/Node";

export interface Mode {
  initial: string;
  ctx: ModeContext;
  destroy?: () => void;
}

export interface MouseCoords {
  x: number;
  y: number;
}

export interface Mouse {
  position: MouseCoords;
  delta: MouseCoords | null;
}

export interface ModeContext {
  renderer: Renderer;
  activateMode: ModeManager["activateMode"];
  emitEvent: OnSceneChange;
}

export interface Coords {
  x: number;
  y: number;
}

export type GeneralEventI = {
  type: "SCENE_LOAD";
  data: {};
};

export type NodeEventI =
  // Grid Events
  | {
      type: "GRID_SELECTED";
    }
  // Node Events
  | {
      type: "NODE_CREATED";
      data: {
        node: string;
      };
    }
  | {
      type: "NODE_REMOVED";
      data: {
        node: string;
      };
    }
  | {
      type: "NODES_SELECTED";
      data: {
        nodes: string[];
      };
    }
  | {
      type: "NODE_MOVED";
      data: {
        node: string;
        from: Coords;
        to: Coords;
      };
    }
  // Utility Events
  | {
      type: "ZOOM_CHANGED";
      data: {
        level: number;
      };
    };

export type SceneEventI = NodeEventI | GeneralEventI;

export type Context = Renderer;

export type OnSceneChange = (event: SceneEventI) => void;
