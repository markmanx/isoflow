// TODO: Split into individual files
import { z } from 'zod';
import { INITIAL_SCENE } from '../config';
import {
  iconInput,
  nodeInput,
  connectorInput,
  rectangleInput,
  textBoxInput
} from './sceneItems';
import { ensureValidConnectors, ensureValidNodes } from './utils';

export const sceneInput = z
  .object({
    title: z.string(),
    icons: z.array(iconInput),
    nodes: z.array(nodeInput),
    connectors: z.array(connectorInput),
    textBoxes: z.array(textBoxInput),
    rectangles: z.array(rectangleInput)
  })
  .superRefine((_scene, ctx) => {
    const scene = { ...INITIAL_SCENE, ..._scene };

    try {
      ensureValidNodes(scene);
      ensureValidConnectors(scene);
    } catch (e) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: e.message
      });
    }
  });
