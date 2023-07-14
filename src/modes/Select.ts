import { ModeBase } from './ModeBase';
import { Mouse } from '../types';
import { getTargetFromSelection } from './utils';
import { SelectNode } from './SelectNode';
import { CreateLasso } from './CreateLasso';
import { CURSOR_TYPES } from '../renderer/elements/Cursor';
import { Coords } from '../renderer/elements/Coords';

export class Select extends ModeBase {
  dragStartTile: Coords | null = null;

  entry(mouse: Mouse) {
    this.ctx.renderer.unfocusAll();

    this.ctx.renderer.sceneElements.cursor.setCursorType(CURSOR_TYPES.TILE);

    const tile = this.ctx.renderer.getTileFromMouse(mouse.position);

    this.ctx.renderer.sceneElements.cursor.displayAt(tile, {
      skipAnimation: true,
    });
    this.ctx.renderer.sceneElements.cursor.setVisible(true);
  }

  exit() {
    this.ctx.renderer.sceneElements.cursor.setVisible(false);
  }

  MOUSE_UP(mouse: Mouse) {
    const { renderer } = this.ctx;
    const tile = renderer.getTileFromMouse(mouse.position);
    const items = renderer.getItemsByTile(tile);
    const target = getTargetFromSelection(items);

    if (!target?.type) {
      this.ctx.emitEvent({
        type: 'TILE_SELECTED',
        data: { tile },
      });
    }

    this.dragStartTile = null;
  }

  MOUSE_DOWN(mouse: Mouse) {
    this.dragStartTile = this.ctx.renderer.getTileFromMouse(mouse.position);

    const { renderer } = this.ctx;
    const tile = renderer.getTileFromMouse(mouse.position);
    const items = renderer.getItemsByTile(tile);
    const target = getTargetFromSelection(items);

    if (target?.type === 'NODE') {
      this.ctx.activateMode(SelectNode, (instance) => (instance.node = target));
    }
  }

  MOUSE_MOVE(mouse: Mouse) {
    const currentTile = this.ctx.renderer.getTileFromMouse(mouse.position);

    if (mouse.delta) {
      const prevTile = this.ctx.renderer.getTileFromMouse(
        mouse.position.subtract(mouse.delta),
      );

      if (currentTile.isEqual(prevTile)) return;
    }

    if (this.dragStartTile && !currentTile.isEqual(this.dragStartTile)) {
      this.ctx.activateMode(CreateLasso, (mode) => {
        this.dragStartTile && mode.setStartTile(this.dragStartTile);
        mode.MOUSE_MOVE(mouse);
      });

      return;
    }

    this.ctx.renderer.sceneElements.cursor.displayAt(currentTile);
    this.ctx.renderer.unfocusAll();

    const items = this.ctx.renderer.getItemsByTile(currentTile);
    const target = getTargetFromSelection(items);

    if (target?.type === 'NODE') {
      target.setFocus(true);
    }
  }
}
