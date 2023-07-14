import { ModeBase } from './ModeBase';
import { Select } from './Select';
import { getBoundingBox, isWithinBounds } from '../renderer/utils/gridHelpers';
import { Mouse } from '../types';
import { Coords } from '../renderer/elements/Coords';
import { Node } from '../renderer/elements/Node';
import { CreateLasso } from './CreateLasso';

export class ManipulateLasso extends ModeBase {
  selectedItems: Node[] = [];

  isMouseDownWithinLassoBounds = false;

  dragOffset = new Coords(0, 0);

  isDragging = false;

  entry(mouse: Mouse) {}

  setSelectedItems(items: Node[]) {
    this.selectedItems = items;
  }

  exit() {}

  MOUSE_MOVE(mouse: Mouse) {
    if (!this.isDragging) return;

    const currentTile = this.ctx.renderer.getTileFromMouse(mouse.position);

    if (mouse.delta) {
      const prevTile = this.ctx.renderer.getTileFromMouse(
        mouse.position.subtract(mouse.delta),
      );

      if (currentTile.isEqual(prevTile)) return;
    }

    const { renderer } = this.ctx;
    const { cursor, grid } = renderer.sceneElements;

    if (this.isMouseDownWithinLassoBounds) {
      const validTile = grid.getAreaWithinGrid(
        currentTile,
        cursor.size,
        this.dragOffset,
      );

      const oldCursorPosition = cursor.position.clone();
      const newCursorPosition = validTile.subtract(this.dragOffset);

      cursor.displayAt(newCursorPosition, {
        skipAnimation: true,
      });

      const translateBy = new Coords(
        -(oldCursorPosition.x - newCursorPosition.x),
        -(oldCursorPosition.y - newCursorPosition.y),
      );

      renderer.sceneElements.nodes.translateNodes(
        this.selectedItems.filter((i) => i.type === 'NODE'),
        translateBy,
      );
    }
  }

  MOUSE_DOWN(mouse: Mouse) {
    const currentTile = this.ctx.renderer.getTileFromMouse(mouse.position);
    const { renderer } = this.ctx;
    const { cursor } = renderer.sceneElements;
    const boundingBox = getBoundingBox([
      renderer.sceneElements.cursor.position,
      new Coords(
        cursor.position.x + cursor.size.x,
        cursor.position.y - cursor.size.y,
      ),
    ]);

    this.isMouseDownWithinLassoBounds = isWithinBounds(
      currentTile,
      boundingBox,
    );

    if (this.isMouseDownWithinLassoBounds) {
      this.isDragging = true;
      this.dragOffset.set(
        currentTile.x - cursor.position.x,
        currentTile.y - cursor.position.y,
      );

      return;
    }

    this.ctx.activateMode(Select, (mode) => mode.MOUSE_DOWN(mouse));
  }

  MOUSE_UP(mouse: Mouse) {
    this.isDragging = false;
  }
}
