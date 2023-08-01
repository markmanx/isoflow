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
    const fromNode = nodes.find((node) => {
      return con.from === node.id;
    });
    const toNode = nodes.find((node) => {
      return con.to === node.id;
    });

    return Boolean(!fromNode || !toNode);
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
