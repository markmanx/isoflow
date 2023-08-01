import gsap from 'gsap';
import {
  Coords,
  SceneInput,
  NodeInput,
  ConnectorInput,
  GroupInput,
  SceneItemTypeEnum
} from 'src/types';
import { customVars } from 'src/styles/theme';
import chroma from 'chroma-js';
import { PROJECTED_TILE_DIMENSIONS } from 'src/renderer/utils/constants';
import { Scene, Node, Connector, Group } from 'src/stores/useSceneStore';
import { NODE_DEFAULTS } from 'src/utils/config';
import { CoordsUtils } from 'src/utils';

export const clamp = (num: number, min: number, max: number) => {
  // eslint-disable-next-line no-nested-ternary
  return num <= min ? min : num >= max ? max : num;
};

export const nonZeroCoords = (coords: Coords) => {
  // For some reason, gsap doesn't like to tween x and y both to 0, so we force 0 to be just above 0.
  return {
    x: coords.x === 0 ? 0.000001 : coords.x,
    y: coords.y === 0 ? 0.000001 : coords.y
  };
};

export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

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

export const roundToOneDecimalPlace = (num: number) => {
  return Math.round(num * 10) / 10;
};

export const nodeInputToNode = (nodeInput: NodeInput): Node => {
  return {
    type: SceneItemTypeEnum.NODE,
    id: nodeInput.id,
    label: nodeInput.label ?? NODE_DEFAULTS.label,
    labelElement: nodeInput.labelElement,
    labelHeight: nodeInput.labelHeight ?? NODE_DEFAULTS.labelHeight,
    color: nodeInput.color ?? NODE_DEFAULTS.color,
    iconId: nodeInput.iconId,
    position: nodeInput.position,
    isSelected: false
  };
};

export const groupInputToGroup = (groupInput: GroupInput): Group => {
  return {
    type: SceneItemTypeEnum.GROUP,
    id: groupInput.id,
    nodeIds: groupInput.nodeIds
  };
};

export const connectorInputToConnector = (
  connectorInput: ConnectorInput
): Connector => {
  return {
    type: SceneItemTypeEnum.CONNECTOR,
    id: connectorInput.id,
    color: connectorInput.color ?? customVars.diagramPalette.blue,
    from: connectorInput.from,
    to: connectorInput.to
  };
};

export const sceneInputtoScene = (sceneInput: SceneInput): Scene => {
  const nodes = sceneInput.nodes.map((nodeInput) => {
    return nodeInputToNode(nodeInput);
  });

  const groups = sceneInput.groups.map((groupInput) => {
    return groupInputToGroup(groupInput);
  });

  const connectors = sceneInput.connectors.map((connectorInput) => {
    return connectorInputToConnector(connectorInput);
  });

  return {
    ...sceneInput,
    nodes,
    groups,
    connectors,
    icons: sceneInput.icons
  } as Scene;
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

export const screenToIso = ({ x, y }: { x: number; y: number }) => {
  const editorWidth = window.innerWidth;
  const editorHeight = window.innerHeight;
  const halfW = PROJECTED_TILE_DIMENSIONS.width / 2;
  const halfH = PROJECTED_TILE_DIMENSIONS.height / 2;

  // The origin is the center of the project.
  const projectPosition = {
    x: x - editorWidth * 0.5,
    y: y - editorHeight * 0.5
  };

  const tile = {
    x: Math.floor(
      (projectPosition.x + halfW) / PROJECTED_TILE_DIMENSIONS.width -
        projectPosition.y / PROJECTED_TILE_DIMENSIONS.height
    ),
    y: -Math.floor(
      (projectPosition.y + halfH) / PROJECTED_TILE_DIMENSIONS.height +
        projectPosition.x / PROJECTED_TILE_DIMENSIONS.width
    )
  };

  return tile;
};

export enum OriginEnum {
  CENTER = 'CENTER',
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export const getTilePosition = (
  { x, y }: { x: number; y: number },
  origin: OriginEnum = OriginEnum.CENTER
) => {
  const editorWidth = window.innerWidth;
  const editorHeight = window.innerHeight;
  const halfW = PROJECTED_TILE_DIMENSIONS.width / 2;
  const halfH = PROJECTED_TILE_DIMENSIONS.height / 2;

  const position: Coords = {
    x: editorWidth * 0.5 + (halfW * x - halfW * y),
    y: editorHeight * 0.5 - (halfH * x + halfH * y) + halfH
  };

  switch (origin) {
    case OriginEnum.TOP:
      return CoordsUtils.add(position, { x: 0, y: -halfH });
    case OriginEnum.BOTTOM:
      return CoordsUtils.add(position, { x: 0, y: halfH });
    case OriginEnum.LEFT:
      return CoordsUtils.add(position, { x: -halfW, y: 0 });
    case OriginEnum.RIGHT:
      return CoordsUtils.add(position, { x: halfW, y: 0 });
    case OriginEnum.CENTER:
    default:
      return position;
  }
};
