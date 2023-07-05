import { makeAutoObservable } from "mobx";
import { Group } from "paper";
import { Coords, Context } from "../../types";
import { theme } from "../../theme";
import { NodeTile } from "./NodeTile";
import { NodeIcon } from "./NodeIcon";

export interface NodeOptions {
  id: string;
  position: Coords;
  iconId: string;
  color?: string;
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
  color: string = theme.customVars.diagramPalette.purple;
  isSelected = false;
  isFocussed = false;

  icon: NodeIcon;
  tile: NodeTile;

  constructor(ctx: Context, options: NodeOptions, callbacks: Callbacks) {
    makeAutoObservable(this);

    this.ctx = ctx;
    this.id = options.id;
    this.position = options.position;
    this.callbacks = callbacks;

    this.icon = new NodeIcon(options.iconId, ctx);
    this.tile = new NodeTile();

    this.container.addChild(this.tile.container);
    this.container.addChild(this.icon.container);
    this.moveTo(this.position.x, this.position.y);

    this.destroy = this.destroy.bind(this);
  }

  // although focus and selection appear to be the same thing, selection happens when a user
  // activates a node, and focus happens when a user hovers over a node.
  setSelected(state: boolean) {
    this.isSelected = state;
    this.setFocus(state);
  }

  setFocus(state: boolean) {
    this.isFocussed = state;

    if (!state && this.isSelected) {
      return;
    }

    this.tile.setFocus(state);
  }

  moveTo(x: number, y: number) {
    this.callbacks.onMove(x, y, this);
  }

  export() {
    return {
      id: this.id,
      position: this.position,
      ...this.icon.export(),
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
