import { NodeInput, ConnectorInput, GroupInput } from 'src/types/inputs';
import { sceneInput } from '../scene';
import {
  findInvalidNode,
  findInvalidConnector,
  findInvalidGroup
} from '../utils';
import { scene } from '../../tests/fixtures/scene';

describe('scene validation works correctly', () => {
  test('scene fixture is valid', () => {
    const result = sceneInput.safeParse(scene);

    expect(result).toEqual(
      expect.objectContaining({
        success: true
      })
    );
  });

  test('finds invalid nodes in scene', () => {
    const { icons } = scene;
    const invalidNode = {
      id: 'invalidNode',
      iconId: 'doesntExist',
      position: { x: -1, y: -1 }
    };
    const nodes: NodeInput[] = [...scene.nodes, invalidNode];

    const result = findInvalidNode(nodes, icons);

    expect(result).toEqual(invalidNode);
  });

  test('finds invalid connectors in scene', () => {
    const { nodes } = scene;
    const invalidConnector = {
      id: 'invalidConnector',
      from: 'node1',
      to: 'invalidNode',
      label: null
    };
    const connectors: ConnectorInput[] = [
      ...scene.connectors,
      invalidConnector
    ];

    const result = findInvalidConnector(connectors, nodes);

    expect(result).toEqual(invalidConnector);
  });

  test('finds invalid groups in scene', () => {
    const { nodes } = scene;
    const invalidGroup: GroupInput = {
      id: 'invalidGroup',
      label: null,
      nodeIds: ['invalidNode', 'node1']
    };
    const groups: GroupInput[] = [...scene.groups, invalidGroup];

    const result = findInvalidGroup(groups, nodes);

    expect(result).toEqual(invalidGroup);
  });
});
