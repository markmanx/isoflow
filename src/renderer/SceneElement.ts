import { Group } from "paper";
import { Context } from "./types";

export class SceneElement {
  container = new Group();
  ctx: Context;

  constructor(ctx: Context) {
    this.ctx = ctx;
  }

  clear() {
    this.container.removeChildren();
  }

  destroy() {
    this.clear();
    this.container.remove();
  }

  export() {}
}
