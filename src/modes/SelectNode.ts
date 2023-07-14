import { ModeBase } from './ModeBase';
import { Select } from './Select';
import { Mouse } from '../types';
import { Node } from '../renderer/elements/Node';

export class SelectNode extends ModeBase {
  node?: Node;

  hasMoved = false;

  entry(mouse: Mouse) {
    const tile = this.ctx.renderer.getTileFromMouse(mouse.position);

    this.ctx.renderer.sceneElements.cursor.displayAt(tile);
    this.ctx.renderer.sceneElements.cursor.setVisible(true);
  }

  exit() {
    this.ctx.renderer.sceneElements.cursor.setVisible(false);
  }

  MOUSE_MOVE(mouse: Mouse) {
    if (!this.node) return;

    const tile = this.ctx.renderer.getTileFromMouse(mouse.position);

    if (this.node.position.x !== tile.x || this.node.position.y !== tile.y) {
      this.node.moveTo(tile);
      this.ctx.renderer.sceneElements.cursor.displayAt(tile);
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
