import { Renderer } from "../renderer/Renderer";

export interface Context {
  renderer?: Renderer;
}

interface Coords {
  x: number;
  y: number;
}

export type MouseEvents =
  | {
      type: "MOUSE_DOWN";
      position: Coords;
      delta: Coords;
      renderer: Renderer;
    }
  | {
      type: "MOUSE_MOVE";
      position: Coords;
      delta: Coords;
      renderer: Renderer;
    }
  | {
      type: "MOUSE_UP";
      position: Coords;
      delta: Coords;
      renderer: Renderer;
    }
  | {
      type: "MOUSE_ENTER";
      position: Coords;
      delta: Coords;
      renderer: Renderer;
    }
  | {
      type: "MOUSE_LEAVE";
      position: Coords;
      delta: Coords;
      renderer: Renderer;
    };

export type Events =
  | {
      type: "INIT";
      renderer: Renderer;
    }
  | {
      type: "SWITCH_TO_SELECT";
    }
  | {
      type: "SWITCH_TO_PAN";
    }
  | {
      type: "SWITCH_TOOL";
      tool: "SELECT" | "PAN";
    }
  | MouseEvents;
