import { makeAutoObservable } from "mobx";
import { Renderer } from "../renderer/Renderer";
import { ModeBase } from "./ModeBase";
import { Mouse } from "./types";

export class ModeManager {
  renderer?: Renderer = undefined;
  currentMode?: {
    instance: ModeBase;
    class: typeof ModeBase;
  };
  lastMode?: typeof ModeBase;
  mouse: Mouse = {
    position: { x: 0, y: 0 },
    delta: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  activateMode<T extends typeof ModeBase>(
    Mode: T,
    init?: (instance: InstanceType<T>) => void
  ) {
    if (!this.renderer) return;

    if (this.currentMode) {
      this.currentMode.instance.exit();
      this.lastMode = this.currentMode.class;
    }

    this.currentMode = {
      instance: new Mode({
        renderer: this.renderer,
        activateMode: this.activateMode.bind(this),
        deactivate: this.deactivate.bind(this),
      }),
      class: Mode,
    };

    init?.(this.currentMode.instance as InstanceType<T>);
    this.currentMode.instance.entry(this.mouse);
  }

  deactivate() {
    if (!this.lastMode) return;

    this.activateMode(this.lastMode);
  }

  onMouseEvent(eventName: string, mouse: Mouse) {
    this.mouse = mouse;

    this.send(eventName, mouse);
  }

  send(eventName: string, params?: any) {
    // TODO: Improve typings below
    // @ts-ignore
    this.currentMode.instance?.[eventName]?.(params);
  }
}
