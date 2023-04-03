import { ModeBase } from "./ModeBase";
import { Mouse, ModeContext } from "./types";
import { Node } from "../renderer/elements/Node";

export class SelectNode extends ModeBase {
  node?: Node;

  constructor(ctx: ModeContext) {
    super(ctx);
  }

  MOUSE_MOVE(mouse: Mouse) {
    if (!this.node) return;

    const tile = this.ctx.renderer.getTileFromMouse(
      mouse.position.x,
      mouse.position.y
    );

    this.node.moveTo(tile.x, tile.y);
  }

  MOUSE_UP() {
    this.ctx.deactivate();
  }
}
