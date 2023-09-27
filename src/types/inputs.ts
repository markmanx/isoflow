import z from 'zod';
import { Size } from 'src/types';
import {
  iconInput,
  nodeInput,
  connectorAnchorInput,
  connectorInput,
  textBoxInput,
  rectangleInput
} from 'src/validation/sceneItems';
import { sceneInput } from 'src/validation/scene';

export { ConnectorStyleEnum } from 'src/validation/sceneItems';
export type IconComponent = React.FunctionComponent<{
  zoom: number;
  projectedTileSize: Size;
}>;
export type IconInput = z.infer<typeof iconInput> & {
  component?: IconComponent;
};
export type NodeInput = z.infer<typeof nodeInput>;
export type ConnectorAnchorInput = z.infer<typeof connectorAnchorInput>;
export type ConnectorInput = z.infer<typeof connectorInput>;
export type TextBoxInput = z.infer<typeof textBoxInput>;
export type RectangleInput = z.infer<typeof rectangleInput>;
export type SceneInput = z.infer<typeof sceneInput>;
