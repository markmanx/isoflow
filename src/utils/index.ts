import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import type { NodeInput } from 'src/validation/SceneSchema';
import { Node, SceneItemTypeEnum } from 'src/stores/useSceneStore';
import { NODE_DEFAULTS } from 'src/utils/defaults';

export const clamp = (num: number, min: number, max: number) =>
  num <= min ? min : num >= max ? max : num;

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
    iconId: nodeInput.iconId,
    position: Coords.fromObject(nodeInput.position),
    isSelected: false,
    type: SceneItemTypeEnum.NODE
  };

  return node;
};
