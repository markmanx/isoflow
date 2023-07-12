export class Coords {
  x: number = 0;
  y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  isEqual(comparator: Coords) {
    return this.x === comparator.x && this.y === comparator.y;
  }

  subtract(operand: Coords) {
    return new Coords(this.x - operand.x, this.y - operand.y);
  }

  subtractX(operand: number) {
    return new Coords(this.x - operand, this.y);
  }

  subtractY(operand: number) {
    return new Coords(this.x, this.y - operand);
  }

  add(operand: Coords) {
    return new Coords(this.x + operand.x, this.y + operand.y);
  }

  addX(operand: number) {
    return new Coords(this.x + operand, this.y);
  }

  addY(operand: number) {
    return new Coords(this.x, this.y + operand);
  }

  clone() {
    return new Coords(this.x, this.y);
  }
}
