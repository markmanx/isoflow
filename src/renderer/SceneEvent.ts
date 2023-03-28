import cuid from "cuid";
import { SceneEventI } from "./types";

type OnSceneEventComplete = (event: SceneEvent) => void;

interface SceneEventArgs {
  onComplete?: OnSceneEventComplete;
  parentEvent?: SceneEvent;
}

export class SceneEvent {
  id = cuid();
  timeStarted = Date.now();
  timeCompleted?: number;
  event: SceneEventI;
  cascadedEvents: SceneEventI[] = [];
  onComplete?: (event: SceneEvent) => void;
  parentEvent?: SceneEvent;

  constructor(event: SceneEventI, opts: SceneEventArgs) {
    this.event = event;
    this.onComplete = opts.onComplete;
    this.parentEvent = opts.parentEvent;
  }

  attachEvent(event: SceneEventI) {
    this.cascadedEvents.push(event);
  }

  complete() {
    if (this.parentEvent) this.parentEvent.attachEvent(this.event);

    if (!this.parentEvent) this.onComplete?.(this);

    this.timeCompleted = Date.now();
  }
}

export const createSceneEvent =
  (onComplete: OnSceneEventComplete) =>
  (event: SceneEventI, opts?: SceneEventArgs) => {
    return new SceneEvent(event, { ...opts, onComplete });
  };
