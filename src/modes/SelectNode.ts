import { ModeBase } from "./ModeBase";
import { Select } from "../modes/Select";
import { Mouse, ModeContext } from "../types";
import { Node } from "../renderer/elements/Node";

export class SelectNode extends ModeBase {
  node?: Node;
  hasMoved = false;

  entry(mouse: Mouse) {
    const tile = this.ctx.renderer.getTileFromMouse(
      mouse.position.x,
      mouse.position.y
    );

    this.ctx.renderer.sceneElements.cursor.displayAt(tile.x, tile.y);
    this.ctx.renderer.sceneElements.cursor.enable();
  }

  exit() {
    this.ctx.renderer.sceneElements.cursor.disable();
  }

  MOUSE_MOVE(mouse: Mouse) {
    if (!this.node) return;

    const tile = this.ctx.renderer.getTileFromMouse(
      mouse.position.x,
      mouse.position.y
    );

    if (this.node.position.x !== tile.x || this.node.position.y !== tile.y) {
      this.node.moveTo(tile.x, tile.y);
      this.ctx.renderer.sceneElements.cursor.displayAt(tile.x, tile.y);
      this.hasMoved = true;
    }
  }

  MOUSE_UP() {
    if (!this.node) return;

    if (!this.hasMoved) {
      this.ctx.renderer.sceneElements.nodes.setSelectedNodes([this.node.id]);
    } else {
    }

    this.ctx.activateMode(Select);
  }
}
