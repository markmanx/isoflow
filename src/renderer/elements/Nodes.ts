import { Group } from "paper";
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

  onMove(coords: Coords, node: Node, opts?: { skipAnimation: boolean }) {
    const from = node.position;
    const to = coords;

    const tile = this.ctx.getTileBounds(coords);
    node.position = coords;

    tweenPosition(node.container, {
      ...tile.center,
      duration: opts?.skipAnimation ? 0 : 0.05,
    });

    this.ctx.emitEvent({
      type: "NODE_MOVED",
      data: { node: node.id, from, to },
    });
  }

  onDestroy(node: Node) {
    const id = node.id;
    const NodeSchemaIndex = this.nodes.indexOf(node);

    if (NodeSchemaIndex === -1) return;

    this.nodes.splice(NodeSchemaIndex, 1);

    this.ctx.emitEvent({
      type: "NODE_REMOVED",
      data: { node: id },
    });
  }

  getNodeById(id: string) {
    return this.nodes.find((node) => node.id === id);
  }

  getNodeByTile(coords: Coords) {
    return this.nodes.find(
      (node) => node.position.x === coords.x && node.position.y === coords.y
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
    const nodes = ids
      .map((id) => {
        const node = this.getNodeById(id);
        node?.setSelected(true);

        return node;
      })
      .filter((node) => node !== undefined) as Node[];

    this.ctx.emitEvent({
      type: "NODES_SELECTED",
      data: { nodes },
    });
  }

  translateNodes(nodes: Node[], translation: Coords) {
    // const updatedConnectors = [];

    nodes.forEach((node) => {
      // const connectors = this.connectors.getConnectorsByNode(node.id);

      // connectors.forEach((con) => {
      //   if (updatedConnectors.includes(con.id)) return;

      //   const connectedNode = con.from.id === node.id ? con.to : con.from;

      //   if (!nodes.find(({ id }) => id === connectedNode.id)) {
      //     con.removeAllAnchors();
      //   } else {
      //     con.translateAnchors(translate);
      //   }

      //   updatedConnectors.push(con.id);
      // });

      node.moveTo(node.position.add(translation), { skipAnimation: true });
    });

    // this.connectors.updateAllPaths();
  }

  export() {
    const exported = this.nodes.map((node) => node.export());
    return exported;
  }
}
