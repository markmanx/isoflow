import {
  SceneInput,
  NodeInput,
  ConnectorInput,
  GroupInput,
  SceneItemTypeEnum,
  Scene,
  Node,
  Connector,
  Group,
  ConnectorAnchorInput,
  ConnectorAnchor,
  Coords
} from 'src/types';
import { NODE_DEFAULTS, DEFAULT_COLOR } from 'src/config';
import { getConnectorPath } from './renderer';

export const nodeInputToNode = (nodeInput: NodeInput): Node => {
  return {
    type: SceneItemTypeEnum.NODE,
    id: nodeInput.id,
    label: nodeInput.label ?? NODE_DEFAULTS.label,
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
    from: groupInput.from,
    to: groupInput.to,
    color: groupInput.color ?? DEFAULT_COLOR
  };
};

const connectorAnchorInputToConnectorAnchor = (
  anchor: ConnectorAnchorInput
): ConnectorAnchor => {
  if (anchor.nodeId) {
    return {
      type: 'NODE',
      id: anchor.nodeId
    };
  }

  return {
    type: 'TILE',
    coords: anchor.tile as Coords
  };
};

export const connectorInputToConnector = (
  connectorInput: ConnectorInput,
  nodes: Node[]
): Connector => {
  const anchors = connectorInput.anchors
    .map((anchor) => {
      return connectorAnchorInputToConnectorAnchor(anchor);
    })
    .filter((anchor) => {
      return anchor !== null;
    });

  return {
    type: SceneItemTypeEnum.CONNECTOR,
    id: connectorInput.id,
    color: connectorInput.color ?? DEFAULT_COLOR,
    anchors,
    path: getConnectorPath({ anchors, nodes })
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
    return connectorInputToConnector(connectorInput, nodes);
  });

  return {
    ...sceneInput,
    nodes,
    groups,
    connectors,
    icons: sceneInput.icons
  } as Scene;
};

export const nodeToNodeInput = (node: Node): NodeInput => {
  return {
    id: node.id,
    position: node.position,
    label: node.label,
    labelHeight: node.labelHeight,
    color: node.color,
    iconId: node.iconId
  };
};

export const connectorAnchorToConnectorAnchorInput = (
  anchor: ConnectorAnchor
): ConnectorAnchorInput | null => {
  switch (anchor.type) {
    case 'NODE':
      return {
        nodeId: anchor.id
      };
    case 'TILE':
      return {
        tile: anchor.coords
      };
    default:
      return null;
  }
};

export const connectorToConnectorInput = (
  connector: Connector
): ConnectorInput => {
  const anchors = connector.anchors
    .map((anchor) => {
      return connectorAnchorToConnectorAnchorInput(anchor);
    })
    .filter((anchor): anchor is ConnectorAnchorInput => {
      return !!anchor;
    });

  return {
    id: connector.id,
    color: connector.color,
    anchors
  };
};

export const groupToGroupInput = (group: Group): GroupInput => {
  return {
    id: group.id,
    color: group.color,
    from: group.from,
    to: group.to
  };
};

export const sceneToSceneInput = (scene: Scene): SceneInput => {
  const nodes: NodeInput[] = scene.nodes.map(nodeInputToNode);
  const connectors: ConnectorInput[] = scene.connectors.map(
    connectorToConnectorInput,
    nodes
  );
  const groups: GroupInput[] = scene.groups.map(groupToGroupInput);

  return {
    nodes,
    connectors,
    groups,
    icons: scene.icons
  } as SceneInput;
};
