// TODO: Split into individual files
import { z } from 'zod';
import { iconInput, nodeInput, connectorInput, groupInput } from './sceneItems';
import {
  findInvalidConnector,
  findInvalidGroup,
  findInvalidNode
} from './utils';

export const sceneInput = z
  .object({
    icons: z.array(iconInput),
    nodes: z.array(nodeInput),
    connectors: z.array(connectorInput),
    groups: z.array(groupInput)
  })
  .superRefine((scene, ctx) => {
    const invalidNode = findInvalidNode(scene.nodes, scene.icons);

    if (invalidNode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['nodes', invalidNode.id],
        message: 'Invalid node found in scene'
      });

      return;
    }

    const invalidConnector = findInvalidConnector(
      scene.connectors,
      scene.nodes
    );

    if (invalidConnector) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['connectors', invalidConnector.id],
        message: 'Invalid connector found in scene'
      });

      return;
    }

    const invalidGroup = findInvalidGroup(scene.groups, scene.nodes);

    if (invalidGroup) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['groups', invalidGroup.id],
        message: 'Invalid group found in scene'
      });
    }
  });
