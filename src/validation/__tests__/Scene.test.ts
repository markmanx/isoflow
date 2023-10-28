import { modelSchema } from '../model';
import { modelItems } from '../../fixtures/modelItems';

describe('Model validation works correctly', () => {
  test('Model fixture is valid', () => {
    const result = modelSchema.safeParse(modelItems);

    expect(result).toEqual(
      expect.objectContaining({
        success: true
      })
    );
  });

  // test('node with invalid icon fails validation', () => {
  //   const invalidNode = {
  //     id: 'invalidNode',
  //     icon: 'doesntExist',
  //     tile: { x: -1, y: -1 }
  //   };
  //   const Model = produce(ModelData, (draft) => {
  //     draft.nodes.push(invalidNode);
  //   });

  //   const result = Model.safeParse(Model);

  //   expect(result.success).toBe(false);
  //   if (result.success === false) {
  //     expect(result.error.errors[0].message).toContain('invalid icon');
  //   }
  // });

  // test('connector with anchor that references an invalid node fails validation', () => {
  //   const invalidConnector = {
  //     id: 'invalidConnector',
  //     anchors: [{ ref: { node: 'node1' } }, { ref: { node: 'invalidNode' } }]
  //   };
  //   const Model = produce(ModelData, (draft) => {
  //     draft.connectors.push(invalidConnector);
  //   });

  //   const result = Model.safeParse(Model);

  //   expect(result.success).toBe(false);
  //   if (result.success === false) {
  //     expect(result.error.errors[0].message).toContain('node does not exist');
  //   }
  // });

  // test('connector with less than two anchors fails validation', () => {
  //   const invalidConnector = {
  //     id: 'invalidConnector',
  //     anchors: [{ ref: { anchor: 'invalidAnchor' } }]
  //   };
  //   const Model = produce(ModelData, (draft) => {
  //     draft.connectors.push(invalidConnector);
  //   });

  //   const result = Model.safeParse(Model);

  //   expect(result.success).toBe(false);
  //   if (result.success === false) {
  //     expect(result.error.errors[0].message).toContain(
  //       'must have at least 2 anchors'
  //     );
  //   }
  // });

  // test('connector with anchor that references an invalid anchor fails validation', () => {
  //   const invalidConnector = {
  //     id: 'invalidConnector',
  //     anchors: [
  //       { ref: { anchor: 'invalidAnchor' } },
  //       { ref: { anchor: 'anchor1' } }
  //     ]
  //   };
  //   const Model = produce(ModelData, (draft) => {
  //     draft.connectors.push(invalidConnector);
  //   });

  //   const result = Model.safeParse(Model);

  //   expect(result.success).toBe(false);
  //   if (result.success === false) {
  //     expect(result.error.errors[0].message).toContain('anchor does not exist');
  //   }
  // });
});
