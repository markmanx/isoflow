import { Group } from "paper";
import autobind from "auto-bind";
import { makeAutoObservable } from "mobx";
import { Context } from "../types";
import { Node, NodeOptions } from "./Node";
import cuid from "cuid";
import { SceneElement } from "../SceneElement";
import { SceneEvent } from "../SceneEvent";

export class Nodes {
  ctx: Context;
  container = new Group();
  nodes: Node[] = [];

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
      }
    );

    this.nodes.push(node);
    this.container.addChild(node.container);

    this.ctx
      .createSceneEvent(
        {
          type: "NODE_CREATED",
          node,
        },
        sceneEvent
      )
      .complete();
  }

  onMove(x: number, y: number, node: Node) {
    const tile = this.ctx.getTileBounds(x, y);
    node.position = {
      x,
      y,
    };
    node.container.position.set(tile.bottom);
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

  export() {
    const exported = this.nodes.map((node) => node.export());
    return exported;
  }
}
