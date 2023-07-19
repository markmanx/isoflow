import { Renderer } from './renderer/components/renderer/Renderer';
import type { ModeManager } from './modes/ModeManager';
import { Coords } from './renderer/elements/Coords';
import { Node } from './renderer/elements/Node';

export interface Mode {
  initial: string;
  ctx: ModeContext;
  destroy?: () => void;
}

export interface Mouse {
  position: Coords;
  delta: Coords | null;
}

export interface ModeContext {
  renderer: Renderer;
  activateMode: ModeManager['activateMode'];
  emitEvent: OnSceneChange;
}

export type GeneralEventI =
  | {
      type: 'SCENE_LOAD';
      data: {};
    }
  | {
      type: 'TILE_SELECTED';
      data: {
        tile: Coords;
      };
    }
  | {
      type: 'MULTISELECT_UPDATED';
      data: {
        itemsSelected: Node[];
      };
    }
  | {
      type: 'ZOOM_CHANGED';
      data: {
        level: number;
      };
    };

export type NodeEventI =
  // Node Events
  | {
      type: 'NODE_CREATED';
      data: {
        node: string;
      };
    }
  | {
      type: 'NODE_REMOVED';
      data: {
        node: string;
      };
    }
  | {
      type: 'NODES_SELECTED';
      data: {
        nodes: Node[];
      };
    }
  | {
      type: 'NODE_MOVED';
      data: {
        node: string;
        from: Coords;
        to: Coords;
      };
    };

export type SceneEventI = NodeEventI | GeneralEventI;

export type Context = Renderer;

export type OnSceneChange = (event: SceneEventI) => void;
