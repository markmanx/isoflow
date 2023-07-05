import { Node } from "../renderer/elements/Node";
import { Mouse } from "../types";
import { Renderer } from "../renderer/Renderer";

export const getTargetFromSelection = (items: (Node | undefined)[]) => {
  const node = items.find((item) => item instanceof Node);

  if (node) {
    return node;
  }

  return null;
};

export const isMouseOverNewTile = (
  mouse: Mouse,
  getTileFromMouse: Renderer["getTileFromMouse"]
) => {
  if (mouse.delta === null) {
    return null;
  }

  const prevTile = getTileFromMouse(
    mouse.position.x - mouse.delta.x,
    mouse.position.y - mouse.delta.y
  );

  const currentTile = getTileFromMouse(mouse.position.x, mouse.position.y);

  if (prevTile.x !== currentTile.x || prevTile.y !== currentTile.y) {
    return currentTile;
  }

  return null;
};
