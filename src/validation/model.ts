import { z } from 'zod';
import { INITIAL_DATA } from '../config';
import { constrainedStrings } from './common';
import { modelItemsSchema } from './modelItems';
import { viewsSchema } from './views';
import { iconsSchema } from './icons';
import { validateModel } from './utils';

export const modelSchema = z
  .object({
    version: z.string().max(10),
    title: constrainedStrings.name,
    description: constrainedStrings.description.optional(),
    icons: iconsSchema,
    items: modelItemsSchema,
    views: viewsSchema
  })
  .superRefine((_Model, ctx) => {
    const issues = validateModel({ ...INITIAL_DATA, ..._Model });

    issues.forEach((issue) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: issue.params,
        message: issue.message
      });
    });
  });
