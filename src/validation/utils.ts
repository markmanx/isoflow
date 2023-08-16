import { ConnectorInput, NodeInput, IconInput } from 'src/types/inputs';

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
