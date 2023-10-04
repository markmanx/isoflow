import {
  IconInput,
  SceneInput,
  RectangleInput,
  ConnectorInput,
  TextBoxInput,
  NodeInput,
  ConnectorStyleEnum
} from 'src/types/inputs';
import { ProjectionOrientationEnum, Coords, Rect, Size } from 'src/types';

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
  TEXTBOX = 'TEXTBOX',
  RECTANGLE = 'RECTANGLE'
}

export interface Node {
  id: string;
  type: SceneItemTypeEnum.NODE;
  icon: string;
  label: string;
  labelHeight: number;
  tile: Coords;
  isSelected: boolean;
}

export type ConnectorAnchorRef =
  | {
      type: 'NODE';
      id: string;
    }
  | {
      type: 'TILE';
      coords: Coords;
    }
  | {
      type: 'ANCHOR';
      id: string;
    };

export type ConnectorAnchor = {
  id?: string;
  ref: ConnectorAnchorRef;
};

export interface Connector {
  type: SceneItemTypeEnum.CONNECTOR;
  id: string;
  color: string;
  width: number;
  style: ConnectorStyleEnum;
  anchors: ConnectorAnchor[];
  path: {
    tiles: Coords[];
    rectangle: Rect;
  };
}

export interface TextBox {
  type: SceneItemTypeEnum.TEXTBOX;
  id: string;
  fontSize: number;
  tile: Coords;
  text: string;
  orientation: ProjectionOrientationEnum;
  size: Size;
}

export interface Rectangle {
  type: SceneItemTypeEnum.RECTANGLE;
  id: string;
  color: string;
  from: Coords;
  to: Coords;
}

export type SceneItem = Node | Connector | TextBox | Rectangle;
export type SceneItemReference = {
  type: SceneItemTypeEnum;
  id: string;
};

export type Icon = IconInput;

export interface SceneActions {
  setScene: (scene: SceneInput) => Scene;
  updateScene: (scene: Scene) => void;
  createNode: (node: NodeInput) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  deleteNode: (id: string) => void;
  createConnector: (connector: ConnectorInput) => void;
  updateConnector: (id: string, updates: Partial<Connector>) => void;
  deleteConnector: (id: string) => void;
  createTextBox: (textBox: TextBoxInput) => void;
  updateTextBox: (id: string, updates: Partial<TextBox>) => void;
  deleteTextBox: (id: string) => void;
  createRectangle: (rectangle: RectangleInput) => void;
  updateRectangle: (id: string, updates: Partial<Rectangle>) => void;
  deleteRectangle: (id: string) => void;
}

export type Scene = {
  nodes: Node[];
  connectors: Connector[];
  textBoxes: TextBox[];
  rectangles: Rectangle[];
  icons: IconInput[];
};

export type SceneStore = Scene & {
  actions: SceneActions;
};
