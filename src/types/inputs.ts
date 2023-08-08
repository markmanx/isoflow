import z from 'zod';
import {
  iconInput,
  nodeInput,
  connectorInput,
  groupInput
} from 'src/validation/sceneItems';
import { sceneInput } from 'src/validation/scene';

export type IconInput = z.infer<typeof iconInput>;
export type NodeInput = z.infer<typeof nodeInput>;
export type ConnectorInput = z.infer<typeof connectorInput>;
export type GroupInput = z.infer<typeof groupInput>;
export type SceneInput = z.infer<typeof sceneInput>;
