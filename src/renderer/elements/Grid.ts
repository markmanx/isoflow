import { Group, Path, Point } from "paper";
import { applyProjectionMatrix } from "../utils/projection";
import type { Context } from "../types";
import { TILE_SIZE, PIXEL_UNIT, SCALING_CONST } from "../constants";
import { SceneElement } from "../SceneElement";

export class Grid extends SceneElement {
  container = new Group();
  renderElements = {
    grid: new Group({ applyMatrix: true }),
  };

  constructor(ctx: Context) {
    super(ctx);

    this.container.addChild(this.renderElements.grid);

    for (let x = 0; x <= this.ctx.config.grid.width; x++) {
      const lineLength = this.ctx.config.grid.height * TILE_SIZE;
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

    for (let y = 0; y <= this.ctx.config.grid.height; y++) {
      const lineLength = this.ctx.config.grid.width * TILE_SIZE;
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
}
