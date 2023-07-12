import React, { useEffect, useRef } from "react";
import Paper, { Group } from "paper";
import { Coords } from "../../utils/Coords";
import { useNodeIcon } from "./useNodeIcon";

export interface NodeProps {
  id: string;
  position: Coords;
  iconId: string;
  parentContainer: paper.Group;
}

export const Node = ({ position, iconId, parentContainer }: NodeProps) => {
  const container = useRef(new Group());
  const nodeIcon = useNodeIcon(iconId);

  useEffect(() => {
    container.current.addChild(nodeIcon.container);
    parentContainer.addChild(container.current);

    return () => {
      container.current.remove();
    };
  }, []);

  useEffect(() => {
    container.current.position.set(position);
  }, [position]);

  return null;
};
