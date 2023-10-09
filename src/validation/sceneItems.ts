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
  collection: z.string().optional(),
  isIsometric: z.boolean().optional()
});

export const nodeInput = z.object({
  id: z.string(),
  label: z.string().optional(),
  description: z.string().optional(),
  labelHeight: z.number().optional(),
  icon: z.string(),
  tile: coords
});

export const connectorAnchorInput = z
  .object({
    id: z.string().optional(),
    ref: z
      .object({
        node: z.string(),
        anchor: z.string(),
        tile: coords
      })
      .partial()
  })
  .superRefine((data, ctx) => {
    const definedRefs = Object.keys(data.ref);

    if (definedRefs.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Connector anchor should be associated with only either a node, another anchor or a tile.'
      });
    }
  });

export const connectorStyleOptions = ['SOLID', 'DOTTED', 'DASHED'] as const;
export const connectorStyleEnum = z.enum(connectorStyleOptions);

export const connectorInput = z.object({
  id: z.string(),
  label: z.string().optional(),
  color: z.string().optional(),
  width: z.number().optional(),
  style: connectorStyleEnum.optional(),
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
