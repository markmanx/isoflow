import { Group } from "paper";
import autobind from "auto-bind";
import { makeAutoObservable, toJS } from "mobx";
import { Context } from "../../types";
import { Node, NodeOptions } from "./Node";
import cuid from "cuid";
import { SceneEvent } from "../SceneEvent";
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

  addNode(options: NodeOptions, sceneEvent?: SceneEvent) {
    const node = new Node(
      this.ctx,
      {
        ...options,
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
    const from = node.position;
    const to = { x, y };

    const tile = this.ctx.getTileBounds(x, y);
    node.position = {
      x,
      y,
    };

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
