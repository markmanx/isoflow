import { Coords } from 'src/utils/Coords';
import { getGridSubset, isWithinBounds } from '../gridHelpers';

jest.mock('paper', () => {
  return {};
});

describe('Tests gridhelpers', () => {
  test('getGridSubset() works correctly', () => {
    const gridSubset = getGridSubset([new Coords(5, 5), new Coords(7, 7)]);

    expect(gridSubset).toEqual([
      new Coords(5, 5),
      new Coords(5, 6),
      new Coords(5, 7),
      new Coords(6, 5),
      new Coords(6, 6),
      new Coords(6, 7),
      new Coords(7, 5),
      new Coords(7, 6),
      new Coords(7, 7)
    ]);
  });

  test('isWithinBounds() works correctly', () => {
    const BOUNDS = [new Coords(4, 4), new Coords(6, 6)];

    const withinBounds = isWithinBounds(new Coords(5, 5), BOUNDS);
    const onBorder = isWithinBounds(new Coords(4, 4), BOUNDS);
    const outsideBounds = isWithinBounds(new Coords(3, 3), BOUNDS);

    expect(withinBounds).toBe(true);
    expect(onBorder).toBe(true);
    expect(outsideBounds).toBe(false);
  });
});
