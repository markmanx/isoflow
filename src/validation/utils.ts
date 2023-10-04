import {
  ConnectorInput,
  NodeInput,
  ConnectorAnchorInput,
  ConnectorAnchor,
  SceneInput
} from 'src/types';
import { getAllAnchorsFromInput, getItemById } from 'src/utils';

export const ensureValidNode = (node: NodeInput, scene: SceneInput) => {
  try {
    getItemById(scene.icons, node.iconId);
  } catch (e) {
    throw new Error(
      `Found invalid node [id: "${node.id}"] referencing an invalid icon [id: "${node.iconId}"]`
    );
  }
};

export const ensureValidNodes = (scene: SceneInput) => {
  scene.nodes.forEach((node) => {
    ensureValidNode(node, scene);
  });
};

export const ensureValidConnectorAnchor = (
  anchor: ConnectorAnchorInput,
  allAnchors: ConnectorAnchor[],
  nodes: NodeInput[]
) => {
  if (anchor.ref.node) {
    const nodeExists = nodes.find((node) => {
      return node.id === anchor.ref.node;
    });

    if (!nodeExists) {
      throw new Error(
        `Anchor [id: "${anchor.id}"] references a node [id: "${anchor.ref.node}"], but that node does not exist`
      );
    }
  }

  if (anchor.ref.anchor) {
    const nextAnchor = allAnchors.find((_anchor) => {
      return _anchor.id === anchor.ref.anchor;
    });

    if (!nextAnchor) {
      throw new Error(
        `Anchor [id: "${anchor.id}"] references another anchor [id: "${anchor.ref.anchor}"], but that anchor does not exist`
      );
    }
  }
};

export const ensureValidConnector = (
  connector: ConnectorInput,
  allAnchors: ConnectorAnchor[],
  nodes: NodeInput[]
) => {
  connector.anchors.forEach((anchor) => {
    try {
      ensureValidConnectorAnchor(anchor, allAnchors, nodes);
    } catch (e) {
      throw new Error(
        `Found invalid connector [id: "${connector.id}"]: ${e.message}`
      );
    }
  });
};

export const ensureValidConnectors = (scene: SceneInput) => {
  const allAnchors = getAllAnchorsFromInput(scene.connectors);

  scene.connectors.forEach((con) => {
    ensureValidConnector(con, allAnchors, scene.nodes);
  });
};
