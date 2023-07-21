import { z } from 'zod';

export const iconInput = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  category: z.string().optional()
});

export const nodeInput = z.object({
  id: z.string(),
  label: z.string().optional(),
  labelHeight: z.number().optional(),
  color: z.string().optional(),
  iconId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number()
  })
});

export const connectorInput = z.object({
  id: z.string(),
  label: z.string().nullable(),
  from: z.string(),
  to: z.string()
});

export const groupInput = z.object({
  id: z.string(),
  label: z.string().nullable(),
  nodes: z.array(z.string())
});

export type IconInput = z.infer<typeof iconInput>;
export type NodeInput = z.infer<typeof nodeInput>;
export type ConnectorInput = z.infer<typeof connectorInput>;
export type GroupInput = z.infer<typeof groupInput>;

export const findInvalidNode = (nodes: NodeInput[], icons: IconInput[]) =>
  nodes.find((node) => {
    const validIcon = icons.find((icon) => node.iconId === icon.id);
    return !validIcon;
  });

export const findInvalidConnector = (
  connectors: ConnectorInput[],
  nodes: NodeInput[]
) =>
  connectors.find((con) => {
    const fromNode = nodes.find((node) => con.from === node.id);
    const toNode = nodes.find((node) => con.to === node.id);

    return Boolean(!fromNode || !toNode);
  });

export const findInvalidGroup = (groups: GroupInput[], nodes: NodeInput[]) =>
  groups.find((grp) =>
    grp.nodes.find((grpNodeSchemaId) => {
      const validNode = nodes.find((node) => node.id === grpNodeSchemaId);
      return Boolean(!validNode);
    })
  );

export const sceneInput = z
  .object({
    icons: z.array(iconInput),
    nodes: z.array(nodeInput),
    connectors: z.array(connectorInput),
    groups: z.array(groupInput),
    gridSize: z.object({
      x: z.number(),
      y: z.number()
    })
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

export type SceneInput = z.infer<typeof sceneInput>;
