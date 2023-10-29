import { produce } from 'immer';
import { model as modelFixture } from 'src/fixtures/model';
import { ItemReference } from 'src/types';
import { changeLayerOrder } from '../layerOrdering';

const getModel = () => {
  return produce(modelFixture, (draft) => {
    draft.views[0].rectangles = [
      {
        id: 'rect1',
        from: { x: 0, y: 0 },
        to: { x: 1, y: 1 }
      },
      {
        id: 'rect2',
        from: { x: 0, y: 0 },
        to: { x: 1, y: 1 }
      },
      {
        id: 'rect3',
        from: { x: 0, y: 0 },
        to: { x: 1, y: 1 }
      }
    ];
  });
};

const scene = {
  connectors: {},
  textBoxes: {}
};

describe('Layer ordering reducers works correctly', () => {
  test('Brings layer forwards correctly', () => {
    const model = getModel();
    const item: ItemReference = {
      type: 'RECTANGLE',
      id: 'rect3'
    };
    const result = changeLayerOrder('BRING_FORWARD', item, 'view1', {
      model,
      scene
    });

    expect(result.model.views[0].rectangles?.[1].id).toBe('rect3');
  });

  test('Brings layer to front correctly', () => {
    const model = getModel();
    const item: ItemReference = {
      type: 'RECTANGLE',
      id: 'rect3'
    };
    const result = changeLayerOrder('BRING_TO_FRONT', item, 'view1', {
      model,
      scene
    });

    expect(result.model.views[0].rectangles?.[0].id).toBe('rect3');
  });

  test('Sends layer backward correctly', () => {
    const model = getModel();
    const item: ItemReference = {
      type: 'RECTANGLE',
      id: 'rect1'
    };
    const result = changeLayerOrder('SEND_BACKWARD', item, 'view1', {
      model,
      scene
    });

    expect(result.model.views[0].rectangles?.[1].id).toBe('rect1');
  });

  test('Sends layer to back correctly', () => {
    const model = getModel();
    const item: ItemReference = {
      type: 'RECTANGLE',
      id: 'rect1'
    };
    const result = changeLayerOrder('SEND_TO_BACK', item, 'view1', {
      model,
      scene
    });

    expect(result.model.views[0].rectangles?.[2].id).toBe('rect1');
  });
});
