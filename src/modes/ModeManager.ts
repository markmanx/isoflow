import { makeAutoObservable } from "mobx";
import { Renderer } from "../renderer/Renderer";
import { ModeBase } from "./ModeBase";
import type { Mouse, OnSceneChange } from "../types";

export class ModeManager {
  // mobx requires all properties to be initialised explicitly (i.e. prop = undefined)
  renderer?: Renderer = undefined;
  currentMode?: {
    instance: ModeBase;
    class: typeof ModeBase;
  } = undefined;
  lastMode?: typeof ModeBase = undefined;
  mouse: Mouse = {
    position: { x: 0, y: 0 },
    delta: null,
  };
  emitEvent?: OnSceneChange;

  constructor() {
    makeAutoObservable(this);
  }

  setRenderer(renderer: Renderer) {
    this.renderer = renderer;
  }

  setEventEmitter(fn: OnSceneChange) {
    this.emitEvent = fn;
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
        emitEvent: this.emitEvent ?? (() => {}),
      }),
      class: Mode,
    };

    init?.(this.currentMode.instance as InstanceType<T>);
    this.currentMode.instance.entry(this.mouse);
  }

  onMouseEvent(eventName: string, mouse: Mouse) {
    this.mouse = mouse;

    this.send(eventName, mouse);
  }

  send(eventName: string, params?: any) {
    // TODO: Improve typings below
    // @ts-ignore
    this.currentMode?.instance[eventName]?.(params);
  }
}
