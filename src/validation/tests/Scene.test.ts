import { produce } from 'immer';
import { sceneInput } from '../scene';
import { scene as sceneFixture } from '../../tests/fixtures/scene';

describe('scene validation works correctly', () => {
  test('scene fixture is valid', () => {
    const result = sceneInput.safeParse(sceneFixture);

    expect(result).toEqual(
      expect.objectContaining({
        success: true
      })
    );
  });

  test('node with invalid iconId fails validation', () => {
    const invalidNode = {
      id: 'invalidNode',
      iconId: 'doesntExist',
      position: { x: -1, y: -1 }
    };
    const scene = produce(sceneFixture, (draft) => {
      draft.nodes.push(invalidNode);
    });

    const result = sceneInput.safeParse(scene);

    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(result.error.errors[0].message).toContain('invalid icon');
    }
  });

  test('connector with anchor that references an invalid node fails validation', () => {
    const invalidConnector = {
      id: 'invalidConnector',
      anchors: [{ ref: { node: 'node1' } }, { ref: { node: 'invalidNode' } }]
    };
    const scene = produce(sceneFixture, (draft) => {
      draft.connectors.push(invalidConnector);
    });

    const result = sceneInput.safeParse(scene);

    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(result.error.errors[0].message).toContain('node does not exist');
    }
  });

  test('connector with anchor that references an invalid anchor fails validation', () => {
    const invalidConnector = {
      id: 'invalidConnector',
      anchors: [{ ref: { anchor: 'invalidAnchor' } }]
    };
    const scene = produce(sceneFixture, (draft) => {
      draft.connectors.push(invalidConnector);
    });

    const result = sceneInput.safeParse(scene);

    expect(result.success).toBe(false);
    if (result.success === false) {
      expect(result.error.errors[0].message).toContain('anchor does not exist');
    }
  });
});
