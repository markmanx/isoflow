import z from 'zod';
import {
  iconInput,
  nodeInput,
  connectorInput,
  groupInput
} from 'src/validation/sceneItems';

export type IconInput = z.infer<typeof iconInput>;
export type NodeInput = z.infer<typeof nodeInput> & {
  labelComponent?: React.ReactNode;
};
export type ConnectorInput = z.infer<typeof connectorInput>;
export type GroupInput = z.infer<typeof groupInput>;
export type SceneInput = {
  icons: IconInput[];
  nodes: NodeInput[];
  connectors: ConnectorInput[];
  groups: GroupInput[];
};
