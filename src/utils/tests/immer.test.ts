// Although we don't normally test third party libraries,
// this is useful to explore the behaviour of immer
import { produce } from 'immer';

const createItem = (x: number, y: number) => {
  return {
    x,
    y
  };
};

describe('Tests immer', () => {
  test('Array equivalence without immer', () => {
    const arr = [createItem(0, 0), createItem(1, 1)];
    const newArr = [createItem(0, 0), createItem(2, 2)];

    expect(arr[0]).not.toBe(newArr[0]);
  });

  test('Array equivalence with immer', () => {
    const arr = [createItem(0, 0), createItem(1, 1)];
    const newArr = produce(arr, (draftState) => {
      draftState[1] = createItem(2, 2);
    });

    expect(arr[0]).toBe(newArr[0]);
  });
});
