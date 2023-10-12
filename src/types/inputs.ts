import z from 'zod';
import {
  iconInput,
  nodeInput,
  connectorAnchorInput,
  connectorInput,
  textBoxInput,
  rectangleInput,
  connectorStyleEnum
} from 'src/validation/sceneItems';
import { sceneInput } from 'src/validation/scene';
import type { EditorModeEnum } from './common';

export type ConnectorStyleEnum = z.infer<typeof connectorStyleEnum>;
export type IconInput = z.infer<typeof iconInput>;
export type NodeInput = z.infer<typeof nodeInput>;
export type ConnectorAnchorInput = z.infer<typeof connectorAnchorInput>;
export type ConnectorInput = z.infer<typeof connectorInput>;
export type TextBoxInput = z.infer<typeof textBoxInput>;
export type RectangleInput = z.infer<typeof rectangleInput>;
export type SceneInput = z.infer<typeof sceneInput>;

export type InitialScene = Partial<SceneInput> & {
  zoom?: number;
};

export interface IsoflowProps {
  initialScene?: InitialScene;
  onSceneUpdated?: (scene: SceneInput) => void;
  width?: number | string;
  height?: number | string;
  enableDebugTools?: boolean;
  editorMode?: keyof typeof EditorModeEnum;
}
