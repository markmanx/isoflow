import { Renderer } from "../renderer/Renderer";
import type { ModeBase } from "./ModeBase";

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
  activateMode: (mode: typeof ModeBase) => void;
  deactivate: () => void;
}
