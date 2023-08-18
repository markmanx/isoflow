import { Coords, Size } from './common';
import {
  IconInput,
  SceneInput,
  RectangleInput,
  ConnectorInput,
  NodeInput
} from './inputs';

export enum TileOriginEnum {
  CENTER = 'CENTER',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export enum SceneItemTypeEnum {
  NODE = 'NODE',
  CONNECTOR = 'CONNECTOR',
  RECTANGLE = 'RECTANGLE'
}

export interface Node {
  id: string;
  type: SceneItemTypeEnum.NODE;
  iconId: string;
  color: string;
  label: string;
  labelHeight: number;
  position: Coords;
  isSelected: boolean;
}

export type ConnectorAnchor =
  | {
      type: 'NODE';
      id: string;
    }
  | {
      type: 'TILE';
      coords: Coords;
    };

export interface Connector {
  type: SceneItemTypeEnum.CONNECTOR;
  id: string;
  color: string;
  width: number;
  anchors: ConnectorAnchor[];
  path: {
    tiles: Coords[];
    origin: Coords;
    areaSize: Size;
  };
}

export interface Rectangle {
  type: SceneItemTypeEnum.RECTANGLE;
  id: string;
  color: string;
  from: Coords;
  to: Coords;
}

export type SceneItem = Node | Connector | Rectangle;
export type SceneItemReference = {
  type: SceneItemTypeEnum;
  id: string;
};

export type Icon = IconInput;

export interface SceneActions {
  setScene: (scene: SceneInput) => void;
  updateScene: (scene: Scene) => void;
  createNode: (node: NodeInput) => void;
  createConnector: (connector: ConnectorInput) => void;
  createRectangle: (rectangle: RectangleInput) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  updateConnector: (id: string, updates: Partial<Connector>) => void;
  updateRectangle: (id: string, updates: Partial<Rectangle>) => void;
  deleteNode: (id: string) => void;
  deleteConnector: (id: string) => void;
  deleteRectangle: (id: string) => void;
}

export type Scene = {
  nodes: Node[];
  connectors: Connector[];
  rectangles: Rectangle[];
  icons: IconInput[];
};

export type SceneStore = Scene & {
  actions: SceneActions;
};
