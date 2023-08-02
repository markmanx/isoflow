import {
  SceneInput,
  NodeInput,
  ConnectorInput,
  GroupInput,
  SceneItemTypeEnum,
  Scene,
  Node,
  Connector,
  Group
} from 'src/types';
import { NODE_DEFAULTS } from 'src/config';
import { customVars } from 'src/styles/theme';

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