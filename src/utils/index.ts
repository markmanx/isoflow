import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import chroma from 'chroma-js';
import type { NodeInput, SceneInput } from 'src/validation/SceneSchema';
import { Node, SceneItemTypeEnum, Scene } from 'src/stores/useSceneStore';
import { NODE_DEFAULTS, GRID_DEFAULTS } from 'src/utils/defaults';

export const clamp = (num: number, min: number, max: number) =>
  num <= min ? min : num >= max ? max : num; // eslint-disable-line no-nested-ternary

export const nonZeroCoords = (coords: Coords) => {
  // For some reason, gsap doesn't like to tween x and y both to 0, so we force 0 to be just above 0.
  const newCoords = new Coords(
    coords.x === 0 ? 0.000001 : coords.x,
    coords.y === 0 ? 0.000001 : coords.y
  );

  return newCoords;
};

export const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const tweenPosition = (
  item: paper.Item,
  { x, y, duration }: { x: number; y: number; duration: number }
) => {
  // paperjs doesn't like it when you try to tween the position of an item directly,
  // so we have to use a proxy object
  const currPosition = {
    x: item.position.x,
    y: item.position.y
  };

  gsap.to(currPosition, {
    duration,
    overwrite: 'auto',
    x,
    y,
    onUpdate: () => {
      item.set({ position: currPosition });
    }
  });
};

export const roundToOneDecimalPlace = (num: number) =>
  Math.round(num * 10) / 10;

export const nodeInputToNode = (nodeInput: NodeInput): Node => {
  const node: Node = {
    id: nodeInput.id,
    label: nodeInput.label ?? NODE_DEFAULTS.label,
    labelHeight: nodeInput.labelHeight ?? NODE_DEFAULTS.labelHeight,
    color: nodeInput.color ?? NODE_DEFAULTS.color,
    iconId: nodeInput.iconId,
    position: Coords.fromObject(nodeInput.position),
    isSelected: false,
    type: SceneItemTypeEnum.NODE
  };

  return node;
};

export const sceneInputtoScene = (sceneInput: SceneInput) => {
  const scene = {
    ...sceneInput,
    nodes: sceneInput.nodes.map((nodeInput) => nodeInputToNode(nodeInput)),
    icons: sceneInput.icons,
    gridSize: sceneInput.gridSize
      ? new Coords(sceneInput.gridSize.width, sceneInput.gridSize.height)
      : Coords.fromObject(GRID_DEFAULTS.size)
  };

  return scene;
};

export const sceneToSceneInput = (scene: Scene) => {
  const nodes: SceneInput['nodes'] = scene.nodes.map((node) => ({
    id: node.id,
    position: node.position.toObject(),
    label: node.label,
    labelHeight: node.labelHeight,
    color: node.color,
    iconId: node.iconId
  }));

  const sceneInput: SceneInput = {
    nodes,
    connectors: [],
    groups: [],
    icons: scene.icons,
    gridSize: { width: scene.gridSize.x, height: scene.gridSize.y }
  };

  return sceneInput;
};

export const getColorVariant = (
  color: string,
  variant: 'light' | 'dark',
  grade?: number
) => {
  switch (variant) {
    case 'light':
      return chroma(color)
        .brighten(grade ?? 1)
        .saturate(2)
        .hex();
    case 'dark':
      return chroma(color)
        .darken(grade ?? 1)
        .saturate(2)
        .hex();
    default:
      return color;
  }
};
