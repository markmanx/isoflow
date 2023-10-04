import {
  IconInput,
  Icon,
  SceneInput,
  NodeInput,
  ConnectorInput,
  TextBoxInput,
  ProjectionOrientationEnum,
  RectangleInput,
  SceneItemTypeEnum,
  Scene,
  Node,
  Connector,
  TextBox,
  Rectangle,
  ConnectorAnchorInput,
  ConnectorAnchor
} from 'src/types';
import {
  NODE_DEFAULTS,
  DEFAULT_COLOR,
  CONNECTOR_DEFAULTS,
  TEXTBOX_DEFAULTS,
  DEFAULT_FONT_FAMILY
} from 'src/config';
import { getConnectorPath, getTextWidth } from 'src/utils';

export const iconInputToIcon = (iconInput: IconInput): Icon => {
  return {
    id: iconInput.id,
    name: iconInput.name,
    url: iconInput.url,
    collection: iconInput.collection,
    isIsometric: iconInput.isIsometric ?? true
  };
};

export const nodeInputToNode = (nodeInput: NodeInput): Node => {
  return {
    type: SceneItemTypeEnum.NODE,
    id: nodeInput.id,
    label: nodeInput.label ?? NODE_DEFAULTS.label,
    labelHeight: nodeInput.labelHeight ?? NODE_DEFAULTS.labelHeight,
    icon: nodeInput.icon,
    tile: nodeInput.tile,
    isSelected: false
  };
};

export const rectangleInputToRectangle = (
  rectangleInput: RectangleInput
): Rectangle => {
  return {
    type: SceneItemTypeEnum.RECTANGLE,
    id: rectangleInput.id,
    from: rectangleInput.from,
    to: rectangleInput.to,
    color: rectangleInput.color ?? DEFAULT_COLOR
  };
};

const connectorAnchorInputToConnectorAnchor = (
  anchor: ConnectorAnchorInput
): ConnectorAnchor => {
  if (anchor.ref.node) {
    return {
      id: anchor.id,
      ref: {
        type: 'NODE',
        id: anchor.ref.node
      }
    };
  }

  if (anchor.ref.tile) {
    return {
      id: anchor.id,
      ref: {
        type: 'TILE',
        coords: anchor.ref.tile
      }
    };
  }

  if (anchor.ref.anchor) {
    return {
      id: anchor.id,
      ref: {
        type: 'ANCHOR',
        id: anchor.ref.anchor
      }
    };
  }

  throw new Error('Could not render connector anchor');
};

export const connectorInputToConnector = (
  connectorInput: ConnectorInput,
  nodes: Node[],
  allAnchors: ConnectorAnchor[]
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
    width: connectorInput.width ?? CONNECTOR_DEFAULTS.width,
    style: connectorInput.style ?? CONNECTOR_DEFAULTS.style,
    anchors,
    path: getConnectorPath({ anchors, nodes, allAnchors })
  };
};

export const textBoxInputToTextBox = (textBoxInput: TextBoxInput): TextBox => {
  const fontSize = textBoxInput.fontSize ?? TEXTBOX_DEFAULTS.fontSize;

  return {
    type: SceneItemTypeEnum.TEXTBOX,
    id: textBoxInput.id,
    orientation: textBoxInput.orientation ?? ProjectionOrientationEnum.X,
    fontSize,
    tile: textBoxInput.tile,
    text: textBoxInput.text,
    size: {
      width: getTextWidth(textBoxInput.text, {
        fontSize,
        fontFamily: DEFAULT_FONT_FAMILY,
        fontWeight: TEXTBOX_DEFAULTS.fontWeight
      }),
      height: 1
    }
  };
};

export const textBoxToTextBoxInput = (textBox: TextBox): TextBoxInput => {
  return {
    id: textBox.id,
    orientation: textBox.orientation,
    fontSize: textBox.fontSize,
    tile: textBox.tile,
    text: textBox.text
  };
};

export const getAllAnchorsFromInput = (connectors: ConnectorInput[]) => {
  const allAnchors = connectors.reduce((acc, connectorInput) => {
    const convertedAnchors = connectorInput.anchors.map((anchor) => {
      return connectorAnchorInputToConnectorAnchor(anchor);
    });
    return [...acc, ...convertedAnchors];
  }, [] as ConnectorAnchor[]);

  return allAnchors;
};

export const sceneInputToScene = (sceneInput: SceneInput): Scene => {
  const icons = sceneInput.icons.map((icon) => {
    return iconInputToIcon(icon);
  });

  const nodes = sceneInput.nodes.map((nodeInput) => {
    return nodeInputToNode(nodeInput);
  });

  const rectangles = sceneInput.rectangles.map((rectangleInput) => {
    return rectangleInputToRectangle(rectangleInput);
  });

  const textBoxes = sceneInput.textBoxes.map((textBoxInput) => {
    return textBoxInputToTextBox(textBoxInput);
  });

  const allAnchors = getAllAnchorsFromInput(sceneInput.connectors);

  const connectors = sceneInput.connectors.map((connectorInput) => {
    return connectorInputToConnector(connectorInput, nodes, allAnchors);
  });

  return {
    icons,
    nodes,
    rectangles,
    connectors,
    textBoxes
  } as Scene;
};

export const iconToIconInput = (icon: Icon): IconInput => {
  return {
    id: icon.id,
    name: icon.name,
    url: icon.url,
    collection: icon.collection,
    isIsometric: icon.isIsometric
  };
};

export const nodeToNodeInput = (node: Node): NodeInput => {
  return {
    id: node.id,
    tile: node.tile,
    label: node.label,
    labelHeight: node.labelHeight,
    icon: node.icon
  };
};

export const connectorAnchorToConnectorAnchorInput = (
  anchor: ConnectorAnchor
): ConnectorAnchorInput | null => {
  switch (anchor.ref.type) {
    case 'NODE':
      return {
        id: anchor.id,
        ref: { node: anchor.ref.id }
      };
    case 'TILE':
      return {
        id: anchor.id,
        ref: { tile: anchor.ref.coords }
      };
    case 'ANCHOR':
      return {
        id: anchor.id,
        ref: { anchor: anchor.ref.id }
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

export const rectangleToRectangleInput = (
  rectangle: Rectangle
): RectangleInput => {
  return {
    id: rectangle.id,
    color: rectangle.color,
    from: rectangle.from,
    to: rectangle.to
  };
};

export const sceneToSceneInput = (scene: Scene): SceneInput => {
  const icons: IconInput[] = scene.icons.map(iconToIconInput);
  const nodes: NodeInput[] = scene.nodes.map(nodeInputToNode);
  const connectors: ConnectorInput[] = scene.connectors.map(
    connectorToConnectorInput,
    nodes
  );
  const textBoxes: TextBoxInput[] = scene.textBoxes.map((textBox) => {
    return textBoxToTextBoxInput(textBox);
  });
  const rectangles: RectangleInput[] = scene.rectangles.map(
    rectangleToRectangleInput
  );

  return {
    icons,
    nodes,
    connectors,
    textBoxes,
    rectangles
  } as SceneInput;
};
