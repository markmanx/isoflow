import { Group } from "paper";
import autobind from "auto-bind";
import { makeAutoObservable, toJS } from "mobx";
import { Context } from "../../types";
import { Node, NodeOptions } from "./Node";
import { Coords } from "./Coords";
import cuid from "cuid";
import { tweenPosition } from "../../utils";

export class Nodes {
  ctx: Context;
  container = new Group();
  nodes: Node[] = [];
  selected: Node[] = [];

  constructor(ctx: Context) {
    makeAutoObservable(this);
    autobind(this);

    this.ctx = ctx;
  }

  addNode(
    options: Omit<NodeOptions, "position" | "id"> & {
      id?: string;
      position: { x: number; y: number };
    }
  ) {
    const position = new Coords(options.position.x, options.position.y);

    const node = new Node(
      this.ctx,
      {
        ...options,
        position,
        id: options.id ?? cuid(),
      },
      {
        onMove: this.onMove.bind(this),
        onDestroy: this.onDestroy.bind(this),
      }
    );

    this.nodes.push(node);
    this.container.addChild(node.container);

    this.ctx.emitEvent({
      type: "NODE_CREATED",
      data: { node: node.id },
    });
  }

  onMove(x: number, y: number, node: Node, opts?: { skipAnimation: boolean }) {
    const from = new Coords(node.position.x, node.position.y);
    const to = new Coords(x, y);

    const tile = this.ctx.getTileBounds(x, y);
    node.position = new Coords(x, y);

    tweenPosition(node.container, {
      ...tile.bottom,
      duration: opts?.skipAnimation ? 0 : 0.05,
    });

    this.ctx.emitEvent({
      type: "NODE_MOVED",
      data: { node: node.id, from, to },
    });
  }

  onDestroy(node: Node) {
    const id = node.id;
    const nodeIndex = this.nodes.indexOf(node);

    if (nodeIndex === -1) return;

    this.nodes.splice(nodeIndex, 1);

    this.ctx.emitEvent({
      type: "NODE_REMOVED",
      data: { node: id },
    });
  }

  getNodeById(id: string) {
    return this.nodes.find((node) => node.id === id);
  }

  getNodeByTile(x: number, y: number) {
    return this.nodes.find(
      (node) => node.position.x === x && node.position.y === y
    );
  }

  unfocusAll() {
    this.nodes.forEach((node) => {
      if (node.isFocussed) node.setFocus(false);
    });
  }

  clear() {
    this.nodes.forEach((node) => node.destroy());
    this.nodes = [];
  }

  setSelectedNodes(ids: string[]) {
    this.nodes.forEach((node) => {
      node.selected = ids.includes(node.id);
    });

    this.ctx.emitEvent({
      type: "NODES_SELECTED",
      data: { nodes: ids },
    });
  }

  export() {
    const exported = this.nodes.map((node) => node.export());
    return exported;
  }
}
