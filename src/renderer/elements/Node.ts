import { makeAutoObservable } from "mobx";
import { Group, Raster } from "paper";
import { Coords, Context } from "../../types";
import { PROJECTED_TILE_WIDTH, PIXEL_UNIT } from "../constants";

const NODE_IMG_PADDING = 0 * PIXEL_UNIT;

export interface NodeOptions {
  id: string;
  position: Coords;
  icon: string;
}

interface Callbacks {
  onMove: (x: number, y: number, node: Node) => void;
  onDestroy: (node: Node) => void;
}

export class Node {
  ctx: Context;
  container = new Group();

  id;
  selected = false;
  callbacks: Callbacks;
  position;
  icon;
  renderElements = {
    iconContainer: new Group(),
    icon: new Raster(),
  };

  constructor(ctx: Context, options: NodeOptions, callbacks: Callbacks) {
    makeAutoObservable(this);

    this.ctx = ctx;
    this.id = options.id;
    this.position = options.position;
    this.icon = options.icon;
    this.callbacks = callbacks;

    this.renderElements.iconContainer.addChild(this.renderElements.icon);
    this.container.addChild(this.renderElements.iconContainer);

    this.destroy = this.destroy.bind(this);

    this.init();
  }

  async init() {
    await this.updateIcon(this.icon);
    this.moveTo(this.position.x, this.position.y);
  }

  async updateIcon(icon: string) {
    this.icon = icon;
    const { iconContainer, icon: iconEl } = this.renderElements;

    await new Promise((resolve) => {
      iconEl.onLoad = () => {
        iconEl.scale(
          (PROJECTED_TILE_WIDTH - NODE_IMG_PADDING) / iconEl.bounds.width
        );

        iconContainer.pivot = iconEl.bounds.bottomCenter;
        iconContainer.position.set(0, 0);

        resolve(null);
      };

      iconEl.source = this.ctx.getIconById(this.icon).url;
    });
  }

  moveTo(x: number, y: number) {
    this.callbacks.onMove(x, y, this);
  }

  export() {
    return {
      id: this.id,
      position: this.position,
      icon: this.icon,
    };
  }

  clear() {
    this.container.removeChildren();
  }

  destroy() {
    this.container.remove();
    this.callbacks.onDestroy(this);
  }
}
