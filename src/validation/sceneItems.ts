import z from 'zod';
import { ProjectionOrientationEnum } from 'src/types/common';

const coords = z.object({
  x: z.number(),
  y: z.number()
});

export const iconInput = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  category: z.string().optional(),
  isIsometric: z.boolean().optional()
});

export const nodeInput = z.object({
  id: z.string(),
  label: z.string().optional(),
  labelHeight: z.number().optional(),
  color: z.string().optional(),
  iconId: z.string(),
  position: coords
});

export const connectorAnchorInput = z
  // TODO: See if we can use `z.discriminatedUnion` here. See https://github.com/colinhacks/zod#unions
  .object({
    nodeId: z.string(),
    tile: coords
  })
  .partial()
  .superRefine((data, ctx) => {
    if (!data.nodeId && !data.tile) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['connectorAnchor'],
        message: 'Connector anchor needs either a nodeId or tile coords.'
      });
    }
  });

export enum ConnectorStyleEnum {
  SOLID = 'SOLID',
  DOTTED = 'DOTTED',
  DASHED = 'DASHED'
}

export const connectorInput = z.object({
  id: z.string(),
  color: z.string().optional(),
  width: z.number().optional(),
  style: z
    .union([
      z.literal(ConnectorStyleEnum.SOLID),
      z.literal(ConnectorStyleEnum.DOTTED),
      z.literal(ConnectorStyleEnum.DASHED)
    ])
    .optional(),
  anchors: z.array(connectorAnchorInput)
});

export const textBoxInput = z.object({
  id: z.string(),
  tile: coords,
  text: z.string(),
  fontSize: z.number().optional(),
  orientation: z
    .union([
      z.literal(ProjectionOrientationEnum.X),
      z.literal(ProjectionOrientationEnum.Y)
    ])
    .optional()
});

export const rectangleInput = z.object({
  id: z.string(),
  color: z.string().optional(),
  from: coords,
  to: coords
});
