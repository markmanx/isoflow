import { Coords } from './common';
import { IconInput } from './inputs';

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
  labelElement?: React.ReactNode;
}

export interface Connector {
  type: SceneItemTypeEnum.CONNECTOR;
  id: string;
  color: string;
  from: string;
  to: string;
}

export interface Group {
  type: SceneItemTypeEnum.GROUP;
  id: string;
  nodeIds: string[];
}

export type SceneItem = Node | Connector | Group;

export type Icon = IconInput;

export type Scene = {
  nodes: Node[];
  connectors: Connector[];
  groups: Group[];
  icons: IconInput[];
};

export interface SceneActions {
  set: (scene: Scene) => void;
  setItems: (elements: {
    nodes: Node[];
    connectors: Connector[];
    groups: Group[];
  }) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  createNode: (position: Coords) => void;
}
