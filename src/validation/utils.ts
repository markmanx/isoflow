import {
  ConnectorInput,
  NodeInput,
  GroupInput,
  IconInput
} from 'src/types/inputs';

export const findInvalidNode = (nodes: NodeInput[], icons: IconInput[]) => {
  return nodes.find((node) => {
    const validIcon = icons.find((icon) => {
      return node.iconId === icon.id;
    });
    return !validIcon;
  });
};

export const findInvalidConnector = (
  connectors: ConnectorInput[],
  nodes: NodeInput[]
) => {
  return connectors.find((con) => {
    const invalidAnchor = con.anchors.find((anchor) => {
      if (
        anchor.nodeId &&
        !nodes.find((node) => {
          return node.id === anchor.nodeId;
        })
      ) {
        return true;
      }

      return false;
    });

    return Boolean(invalidAnchor);
  });
};

export const findInvalidGroup = (groups: GroupInput[], nodes: NodeInput[]) => {
  return groups.find((grp) => {
    return grp.nodeIds.find((nodeId) => {
      const validNode = nodes.find((node) => {
        return node.id === nodeId;
      });
      return Boolean(!validNode);
    });
  });
};
