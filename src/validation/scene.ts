// TODO: Split into individual files
import { z } from 'zod';
import {
  iconInput,
  nodeInput,
  connectorInput,
  rectangleInput,
  textBoxInput
} from './sceneItems';
import { findInvalidConnector, findInvalidNode } from './utils';

export const sceneInput = z
  .object({
    icons: z.array(iconInput),
    nodes: z.array(nodeInput),
    connectors: z.array(connectorInput),
    textBoxes: z.array(textBoxInput),
    rectangles: z.array(rectangleInput)
  })
  .superRefine((scene, ctx) => {
    const icons = scene.icons ?? [];
    const nodes = scene.nodes ?? [];
    const connectors = scene.connectors ?? [];

    const invalidNode = findInvalidNode(nodes, icons);

    if (invalidNode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['nodes', invalidNode.id],
        message: 'Invalid node found in scene'
      });

      return;
    }

    const invalidConnector = findInvalidConnector(connectors, nodes);

    if (invalidConnector) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['connectors', invalidConnector.id],
        message: 'Invalid connector found in scene'
      });
    }
  });
