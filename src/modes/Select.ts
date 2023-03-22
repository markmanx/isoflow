import { ModeBase } from "./ModeBase";
import { Mouse } from "./types";

export class Select extends ModeBase {
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

  MOUSE_ENTER() {
    this.ctx.renderer.sceneElements.cursor.enable();
  }

  MOUSE_LEAVE() {
    this.ctx.renderer.sceneElements.cursor.disable();
  }

  MOUSE_MOVE(mouse: Mouse) {
    const tile = this.ctx.renderer.getTileFromMouse(
      mouse.position.x,
      mouse.position.y
    );

    this.ctx.renderer.sceneElements.cursor.displayAt(tile.x, tile.y);
  }
}
