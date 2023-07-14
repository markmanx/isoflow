import { ModeBase } from './ModeBase';
import { Select } from './Select';
import { getGridSubset, isWithinBounds } from '../renderer/utils/gridHelpers';
import { Mouse } from '../types';
import { Coords } from '../renderer/elements/Coords';
import { Node } from '../renderer/elements/Node';
import { ManipulateLasso } from './ManipulateLasso';

export class CreateLasso extends ModeBase {
  startTile: Coords | null = null;

  nodesSelected: Node[] = [];

  selectionGrid: Coords[] = [];

  entry(mouse: Mouse) {
    if (!this.startTile) {
      this.startTile = this.ctx.renderer.getTileFromMouse(mouse.position);
    }

    this.ctx.renderer.sceneElements.cursor.displayAt(this.startTile, {
      skipAnimation: true,
    });
    this.ctx.renderer.sceneElements.cursor.setVisible(true);
  }

  setStartTile(tile: Coords) {
    this.startTile = tile;
  }

  exit() {}

  MOUSE_MOVE(mouse: Mouse) {
    const currentTile = this.ctx.renderer.getTileFromMouse(mouse.position);

    if (mouse.delta) {
      const prevTile = this.ctx.renderer.getTileFromMouse(
        mouse.position.subtract(mouse.delta),
      );

      if (currentTile.isEqual(prevTile)) return;
    }

    if (!this.startTile) return;

    this.ctx.renderer.sceneElements.cursor.createSelection(
      this.startTile,
      currentTile,
    );

    this.selectionGrid = getGridSubset([this.startTile, currentTile]);
    this.nodesSelected = this.selectionGrid.reduce<Node[]>((acc, tile) => {
      const tileItems = this.ctx.renderer.getItemsByTile(tile);
      const filtered = tileItems.filter((i) => i?.type === 'NODE') as Node[];
      return [...acc, ...filtered];
    }, []);

    this.ctx.emitEvent({
      type: 'MULTISELECT_UPDATED',
      data: {
        itemsSelected: this.nodesSelected,
      },
    });
  }

  MOUSE_DOWN(mouse: Mouse) {
    if (this.nodesSelected.length > 0) {
      this.ctx.activateMode(ManipulateLasso, (mode) => {
        mode.setSelectedItems(this.nodesSelected);
        mode.MOUSE_DOWN(mouse);
      });
    }
  }

  MOUSE_UP(mouse: Mouse) {
    this.startTile = null;

    const currentTile = this.ctx.renderer.getTileFromMouse(mouse.position);

    if (
      this.nodesSelected.length === 0
      || !isWithinBounds(currentTile, this.selectionGrid)
    ) {
      this.ctx.activateMode(Select);
    }
  }
}
