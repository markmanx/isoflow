export interface Coords {
  x: number;
  y: number;
}

export interface Context {
  grid: {
    width: number;
    height: number;
  };
}

export interface SceneElement {
  container: paper.Group;
  ctx: Context;
  renderElements?: {
    [k: string]: paper.Item;
  };
}
