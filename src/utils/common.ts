import chroma from 'chroma-js';
import { SceneInput, Scene } from 'src/types';

export const clamp = (num: number, min: number, max: number) => {
  // eslint-disable-next-line no-nested-ternary
  return num <= min ? min : num >= max ? max : num;
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const roundToOneDecimalPlace = (num: number) => {
  return Math.round(num * 10) / 10;
};

export const sceneToSceneInput = (scene: Scene): SceneInput => {
  const nodes: SceneInput['nodes'] = scene.nodes.map((node) => {
    return {
      id: node.id,
      position: node.position,
      label: node.label,
      labelHeight: node.labelHeight,
      color: node.color,
      iconId: node.iconId
    };
  });

  return {
    nodes,
    connectors: [],
    groups: [],
    icons: scene.icons
  } as SceneInput;
};

interface GetColorVariantOpts {
  alpha?: number;
  grade?: number;
}

export const getColorVariant = (
  color: string,
  variant: 'light' | 'dark',
  { alpha = 1, grade = 0 }: GetColorVariantOpts
) => {
  switch (variant) {
    case 'light':
      return chroma(color)
        .brighten(grade ?? 1)
        .alpha(alpha)
        .css();
    case 'dark':
      return chroma(color)
        .darken(grade ?? 1)
        .alpha(alpha)
        .css();
    default:
      return chroma(color).alpha(alpha).css();
  }
};
