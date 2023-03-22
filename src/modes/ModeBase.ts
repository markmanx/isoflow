import { ModeContext, Mouse } from "./types";
import { makeAutoObservable } from "mobx";

export class ModeBase {
  ctx;

  constructor(ctx: ModeContext) {
    makeAutoObservable(this);
    this.ctx = ctx;
  }

  entry(mouse: Mouse) {}

  exit() {}
}
