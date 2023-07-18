import { Item } from '../../../stores';
import { NodeSchemaI, ConnectorSchemaI } from '../../../validation/SceneSchema';

export const getFullItem = (
  item: Item,
  scene: { nodes: NodeSchemaI[]; connectors: ConnectorSchemaI[] }
) => {
  if (item.type === 'NODE') {
    return scene.nodes.find((node) => node.id === item.id);
  }

  if (item.type === 'CONNECTOR') {
    return scene.connectors.find((con) => con.id === item.id);
  }

  return null;
};
