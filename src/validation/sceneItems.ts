import z from 'zod';

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
  color: z.string().optional(),
  from: z.string(),
  to: z.string()
});

export const groupInput = z.object({
  id: z.string(),
  color: z.string().optional(),
  nodeIds: z.array(z.string())
});
