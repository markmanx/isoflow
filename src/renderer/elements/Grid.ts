import { Group, Path, Point } from "paper";
import { makeAutoObservable } from "mobx";
import { applyProjectionMatrix } from "../utils/projection";
import type { Context } from "../../types";
import { TILE_SIZE, PIXEL_UNIT, SCALING_CONST } from "../constants";
import { Coords } from "./Coords";
import { sortByPosition, getBoundingBox } from "../utils/gridHelpers";

export class Grid {
  ctx: Context;
  container = new Group();
  renderElements = {
    grid: new Group({ applyMatrix: true }),
  };

  size: Coords;

  constructor(size: Coords, ctx: Context) {
    makeAutoObservable(this);

    this.size = size;
    this.ctx = ctx;
    this.container.addChild(this.renderElements.grid);

    for (let x = 0; x <= this.size.x; x++) {
      const lineLength = this.size.y * TILE_SIZE;
      const start = x * TILE_SIZE - lineLength * 0.5;
      const line = new Path({
        segments: [
          [start, -lineLength * 0.5],
          [start, lineLength * 0.5],
        ],
        strokeWidth: PIXEL_UNIT * 1,
        strokeColor: "rgba(0, 0, 0, 0.15)",
      });

      this.renderElements.grid.addChild(line);
    }

    for (let y = 0; y <= this.size.y; y++) {
      const lineLength = this.size.x * TILE_SIZE;
      const start = y * TILE_SIZE - lineLength * 0.5;
      const line = new Path({
        segments: [
          [-lineLength * 0.5, start],
          [lineLength * 0.5, start],
        ],
        strokeWidth: PIXEL_UNIT * 1,
        strokeColor: "rgba(0, 0, 0, 0.15)",
      });

      this.renderElements.grid.addChild(line);
    }

    this.renderElements.grid.scaling = new Point(SCALING_CONST, SCALING_CONST);
    applyProjectionMatrix(this.renderElements.grid);
  }

  getGridBounds() {
    const halfW = Math.floor(this.size.x * 0.5);
    const halfH = Math.floor(this.size.y * 0.5);

    return getBoundingBox([
      new Coords(-halfW, -halfH),
      new Coords(-halfW, halfH),
      new Coords(halfW, halfH),
      new Coords(halfW, -halfH),
    ]);
  }

  getAreaWithinGrid(
    tile: Coords,
    size: Coords,
    offset: Coords = new Coords(0, 0)
  ) {
    const position = tile.subtract(offset);

    const areaBounds = sortByPosition([
      position,
      position.subtractY(size.y),
      new Coords(position.x + size.x, position.y - size.y),
      position.addX(size.x),
    ]);
    const gridBounds = sortByPosition(this.getGridBounds());

    const delta = new Coords(0, 0);

    if (areaBounds.highX > gridBounds.highX) {
      delta.setX(-(areaBounds.highX - gridBounds.highX));
    }

    if (areaBounds.lowX < gridBounds.lowX) {
      delta.setX(gridBounds.lowX - areaBounds.lowX);
    }

    if (areaBounds.highY > gridBounds.highY) {
      delta.setY(-(areaBounds.highY - gridBounds.highY));
    }

    if (areaBounds.lowY < gridBounds.lowY) {
      delta.setY(gridBounds.lowY - areaBounds.lowY);
    }

    return new Coords(tile.x + delta.x, tile.y + delta.y);
  }
}
