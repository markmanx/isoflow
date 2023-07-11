import { makeAutoObservable } from "mobx";
import { Tool } from "paper";
import { Renderer } from "../renderer/Renderer";
import { Coords } from "../renderer/elements/Coords";
import { ModeBase } from "./ModeBase";
import type { Mouse, OnSceneChange } from "../types";

const MOUSE_EVENTS = new Map([
  ["mousemove", "MOUSE_MOVE"],
  ["mousedown", "MOUSE_DOWN"],
  ["mouseup", "MOUSE_UP"],
]);

export class ModeManager {
  // mobx requires all properties to be initialised explicitly (i.e. prop = undefined)
  renderer?: Renderer = undefined;
  currentMode?: {
    instance: ModeBase;
    class: typeof ModeBase;
  } = undefined;
  lastMode?: typeof ModeBase = undefined;
  mouse: Mouse = {
    position: new Coords(0, 0),
    delta: null,
  };
  emitEvent?: OnSceneChange;
  tool?: paper.Tool;

  constructor() {
    makeAutoObservable(this);

    this.onMouseEvent = this.onMouseEvent.bind(this);
    this.send = this.send.bind(this);
  }

  setRenderer(renderer: Renderer) {
    this.renderer = renderer;

    this.tool = new Tool();
    this.tool.onMouseMove = this.onMouseEvent;
    this.tool.onMouseDown = this.onMouseEvent;
    this.tool.onMouseUp = this.onMouseEvent;
    this.tool.onKeyDown = this.onMouseEvent;
    this.tool.onKeyUp = this.onMouseEvent;
  }

  setEventEmitter(fn: OnSceneChange) {
    this.emitEvent = fn;
  }

  activateMode<T extends typeof ModeBase>(
    Mode: T,
    init?: (instance: InstanceType<T>) => void
  ) {
    console.log("ACTIVATING MODE", Mode.name);

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

  onMouseEvent(event: paper.ToolEvent) {
    const type = MOUSE_EVENTS.get(event.type);

    if (!type) return;

    const mouse = {
      position: new Coords(event.point.x, event.point.y),
      delta: event.delta ? new Coords(event.delta.x, event.delta.y) : null,
    };

    this.mouse = mouse;
    this.send(type, this.mouse);
  }

  send(eventName: string, params?: any) {
    // TODO: Improve typings below
    // @ts-ignore
    this.currentMode?.instance[eventName]?.(params);
  }
}
