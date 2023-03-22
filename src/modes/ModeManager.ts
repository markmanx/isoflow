import { makeAutoObservable } from "mobx";
import autoBind from "auto-bind";
import { Renderer } from "../renderer/Renderer";
import { ModeBase } from "./ModeBase";
import { Mouse } from "./types";

export class ModeManager {
  renderer?: Renderer = undefined;
  currentMode?: ModeBase = undefined;
  mouse: Mouse = {
    position: { x: 0, y: 0 },
    delta: null,
  };

  constructor() {
    makeAutoObservable(this);
    autoBind(this);
  }

  setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  activateMode(Mode: typeof ModeBase) {
    if (!this.renderer) return;

    const lastMode = this.currentMode;
    this.currentMode?.exit();

    this.currentMode = new Mode({
      renderer: this.renderer,
      activateMode: this.activateMode.bind(this),
      deactivate: lastMode?.exit ?? (() => {}),
    });

    this.currentMode.entry(this.mouse);
  }

  onMouseEvent(eventName: string, mouse: Mouse) {
    this.mouse = mouse;

    this.send(eventName, mouse);
  }

  send(eventName: string, params?: any) {
    // TODO: Improve typings below
    // @ts-ignore
    this.currentMode?.[eventName]?.(params);
  }
}
