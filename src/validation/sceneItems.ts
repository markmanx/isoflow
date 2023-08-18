import z from 'zod';

const coords = z.object({
  x: z.number(),
  y: z.number()
});

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
  position: coords
});

export const connectorAnchorInput = z
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

export const connectorInput = z.object({
  id: z.string(),
  color: z.string().optional(),
  width: z.number().optional(),
  anchors: z.array(connectorAnchorInput)
});

export const rectangleInput = z.object({
  id: z.string(),
  color: z.string().optional(),
  from: coords,
  to: coords
});
