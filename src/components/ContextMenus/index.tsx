import React from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { NodeContextMenu } from "./NodeContextMenu";
import { TileContextMenu } from "./TileContextMenu";
import { Node } from "../../renderer/elements/Node";
import { Coords } from "../../renderer/elements/Coords";

export const ContextMenu = () => {
  const targetElement = useGlobalState((state) => state.showContextMenuFor);

  if (!targetElement) {
    return null;
  }

  if (targetElement instanceof Node) {
    return <NodeContextMenu node={targetElement} />;
  }

  if (targetElement instanceof Coords) {
    return <TileContextMenu tile={targetElement} />;
  }

  return null;
};
