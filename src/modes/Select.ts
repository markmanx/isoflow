import { ModeBase } from "./ModeBase";
import { Mouse } from "../types";
import { getTargetFromSelection, isMouseOverNewTile } from "./utils";
import { SelectNode } from "./SelectNode";
import { Node } from "../renderer/elements/Node";

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

  MOUSE_ENTER(mouse: Mouse) {
    const { renderer } = this.ctx;

    renderer.sceneElements.cursor.enable();
  }

  MOUSE_LEAVE() {
    this.ctx.renderer.sceneElements.cursor.disable();
  }

  MOUSE_DOWN(mouse: Mouse) {
    const { renderer } = this.ctx;
    const { x, y } = renderer.getTileFromMouse(
      mouse.position.x,
      mouse.position.y
    );
    const items = renderer.getItemsByTile(x, y);
    const target = getTargetFromSelection(items);

    if (target instanceof Node) {
      this.ctx.activateMode(SelectNode, (instance) => (instance.node = target));
      return;
    }

    this.ctx.emitEvent({ type: "GRID_SELECTED" });
  }

  MOUSE_MOVE(mouse: Mouse) {
    const newTile = isMouseOverNewTile(
      mouse,
      this.ctx.renderer.getTileFromMouse
    );

    if (newTile) {
      this.ctx.renderer.sceneElements.cursor.displayAt(newTile.x, newTile.y);

      const items = this.ctx.renderer.getItemsByTile(newTile.x, newTile.y);
      const target = getTargetFromSelection(items);

      this.ctx.renderer.unfocusAll();

      if (target instanceof Node) {
        target.setFocus(true);
        return;
      }
    }
  }
}
