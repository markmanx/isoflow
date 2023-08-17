import { Coords, Size } from './common';
import {
  IconInput,
  SceneInput,
  GroupInput,
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
  GROUP = 'GROUP'
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
  anchors: ConnectorAnchor[];
  path: {
    tiles: Coords[];
    origin: Coords;
    areaSize: Size;
  };
}

export interface Group {
  type: SceneItemTypeEnum.GROUP;
  id: string;
  color: string;
  from: Coords;
  to: Coords;
}

export type SceneItem = Node | Connector | Group;

export type Icon = IconInput;

export interface SceneActions {
  setScene: (scene: SceneInput) => void;
  updateScene: (scene: Scene) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  updateConnector: (id: string, updates: Partial<Connector>) => void;
  translateGroup: (id: string, delta: Coords) => void;
  createNode: (node: NodeInput) => void;
  createConnector: (connector: ConnectorInput) => void;
  createGroup: (group: GroupInput) => void;
}

export type Scene = {
  nodes: Node[];
  connectors: Connector[];
  groups: Group[];
  icons: IconInput[];
};

export type SceneStore = Scene & {
  actions: SceneActions;
};
