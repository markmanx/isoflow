import { Group, Shape, Point } from "paper";
import { gsap } from "gsap";
import { applyProjectionMatrix } from "../utils/projection";
import { TILE_SIZE, PIXEL_UNIT } from "../constants";
import {
  sortByPosition,
  getBoundingBox,
  getTileBounds,
} from "../utils/gridHelpers";
import type { SceneElement, Context, Coords } from "../types";

export enum CURSOR_TYPES {
  OUTLINE = "OUTLINE",
  CIRCLE = "CIRCLE",
  TILE = "TITLE",
  LASSO = "LASSO",
  DOT = "DOT",
}

export class Cursor implements SceneElement {
  ctx: Context;
  container = new Group();

  renderElements = {
    rectangle: new Shape.Rectangle({}),
  };

  animations: {
    highlight: gsap.core.Tween;
  };

  position = {
    x: 0,
    y: 0,
  };

  size = {
    width: 1,
    height: 1,
  };

  currentType?: CURSOR_TYPES;

  constructor(ctx: Context) {
    this.ctx = ctx;

    this.animations = {
      highlight: gsap
        .fromTo(
          this.renderElements.rectangle,
          { duration: 0.25, dashOffset: 0 },
          { dashOffset: PIXEL_UNIT * 12, ease: "none" }
        )
        .repeat(-1)
        .pause(),
    };

    this.container.addChild(this.renderElements.rectangle);
    applyProjectionMatrix(this.container);

    this.setCursorType(CURSOR_TYPES.TILE);
    this.displayAt(0, 0);
    this.enable();
  }

  setCursorType(type: CURSOR_TYPES) {
    if (type === this.currentType) return;

    this.currentType = type;
    this.container.set({ pivot: [0, 0] });
    this.size = {
      width: 1,
      height: 1,
    };

    switch (type) {
      case CURSOR_TYPES.OUTLINE:
        this.renderElements.rectangle.set({
          strokeCap: "round",
          fillColor: null,
          size: [TILE_SIZE * 1.8, TILE_SIZE * 1.8],
          opacity: 1,
          radius: PIXEL_UNIT * 25,
          strokeWidth: PIXEL_UNIT * 3,
          strokeColor: "blue",
          pivot: [0, 0],
          dashArray: [PIXEL_UNIT * 6, PIXEL_UNIT * 6],
        });
        this.animations.highlight.play();
        break;
      case CURSOR_TYPES.LASSO:
        this.renderElements.rectangle.set({
          strokeCap: "round",
          fillColor: "lightBlue",
          size: [TILE_SIZE, TILE_SIZE],
          opacity: 0.5,
          radius: PIXEL_UNIT * 8,
          strokeWidth: PIXEL_UNIT * 3,
          strokeColor: "blue",
          dashArray: [5, 10],
          pivot: [0, 0],
        });
        this.animations.highlight.play();
        break;
      case CURSOR_TYPES.DOT:
        this.renderElements.rectangle.set({
          strokeCap: null,
          fillColor: "blue",
          size: [TILE_SIZE * 0.2, TILE_SIZE * 0.2],
          opacity: 1,
          radius: PIXEL_UNIT * 8,
          strokeWidth: null,
          strokeColor: null,
          dashArray: null,
          pivot: [0, 0],
        });
        break;
      case CURSOR_TYPES.TILE:
      default:
        this.renderElements.rectangle.set({
          strokeCap: "round",
          fillColor: "blue",
          size: [TILE_SIZE, TILE_SIZE],
          opacity: 0.5,
          radius: PIXEL_UNIT * 8,
          strokeWidth: 0,
          strokeColor: "transparent",
          pivot: [0, 0],
          dashArray: null,
        });
    }
  }

  enable() {
    this.container.visible = true;
  }

  disable() {
    this.container.visible = false;
  }

  createSelection(from: Coords, to: Coords) {
    const boundingBox = getBoundingBox([from, to]);
    this.createSelectionFromBounds(boundingBox);
  }

  createSelectionFromBounds(boundingBox: Coords[]) {
    this.setCursorType(CURSOR_TYPES.LASSO);

    const sorted = sortByPosition(boundingBox);

    this.position = {
      x: sorted.lowX,
      y: sorted.lowY,
    };

    this.size = {
      width: sorted.highX - sorted.lowX,
      height: sorted.highY - sorted.lowY,
    };

    this.renderElements.rectangle.set({
      size: [
        (this.size.width + 1) * (TILE_SIZE - PIXEL_UNIT * 3),
        (this.size.height + 1) * (TILE_SIZE - PIXEL_UNIT * 3),
      ],
    });

    this.container.set({
      pivot: this.renderElements.rectangle.bounds.bottomLeft,
    });

    const targetTile = boundingBox[3];

    this.container.position = new Point(
      getTileBounds(targetTile.x, targetTile.y).left
    );
  }

  predictBoundsAt(tile: Coords) {
    const bounds = [
      { x: tile.x, y: tile.y },
      { x: tile.x, y: tile.y - this.size.height },
      { x: tile.x + this.size.width, y: tile.y - this.size.height },
      { x: tile.x + this.size.width, y: tile.y },
    ];

    return bounds;
  }

  getInfo() {
    return { ...this.position, ...this.size };
  }

  displayAt(x: number, y: number, options?: { animate: boolean }) {
    this.position = {
      x,
      y,
    };

    const tileBoundsPosition =
      this.currentType === CURSOR_TYPES.LASSO ? "left" : "center";

    const position = getTileBounds(x, y)[tileBoundsPosition];

    this.container.set({ position });
  }
}
