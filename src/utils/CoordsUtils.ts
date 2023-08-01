import { Coords } from 'src/types';

export class CoordsUtils {
  static isEqual(base: Coords, operand: Coords) {
    return base.x === operand.x && base.y === operand.y;
  }

  static subtract(base: Coords, operand: Coords): Coords {
    return { x: base.x - operand.x, y: base.y - operand.y };
  }

  static add(base: Coords, operand: Coords): Coords {
    return { x: base.x + operand.x, y: base.y + operand.y };
  }

  static multiply(base: Coords, operand: Coords): Coords {
    return { x: base.x * operand.x, y: base.y * operand.y };
  }

  static toString(coords: Coords) {
    return `x: ${coords.x}, y: ${coords.y}`;
  }

  static zero() {
    return { x: 0, y: 0 };
  }
}
