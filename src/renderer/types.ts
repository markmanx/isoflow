import type { Renderer } from "./Renderer";
import { SceneI } from "../validation/SceneSchema";
import type { Node } from "./elements/Node";

export interface Coords {
  x: number;
  y: number;
}

export type GeneralEventI = {
  type: "SCENE_LOAD";
};

export type NodeEventI =
  | {
      type: "NODE_CREATED";
      node: Node;
    }
  | {
      type: "NODE_REMOVED";
      node: Node;
    };

export type SceneEventI = NodeEventI | GeneralEventI;

export type Context = Renderer;

export type OnSceneChange = (event: SceneEventI, scene: SceneI) => void;
