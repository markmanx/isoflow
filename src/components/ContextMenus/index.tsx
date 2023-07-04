import React from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { NodeContextMenu } from "./NodeContextMenu";

export const ContextMenu = () => {
  const targetElement = useGlobalState((state) => state.showContextMenuAt);

  if (!targetElement) {
    return null;
  }

  return <NodeContextMenu node={targetElement} />;
};
