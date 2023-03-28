import { Shape, Group } from "paper";

export class Positioner {
  container = new Group();

  constructor(color: string = "red") {
    this.container.addChild(
      new Shape.Circle({
        center: [0, 0],
        radius: 10,
        fillColor: color,
      })
    );
  }
}
