import { z } from 'zod';
import { id, color, coords } from '../common';

export const rectangleSchema = z.object({
  id,
  color: color.optional(),
  from: coords,
  to: coords
});
