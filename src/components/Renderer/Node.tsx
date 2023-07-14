import { useEffect, useRef } from 'react';
import { Group } from 'paper';
import { useNodeIcon } from './useNodeIcon';

export interface NodeProps {
  id: string;
  position: { x: number; y: number };
  iconId: string;
  parentContainer: paper.Group;
}

export const Node = ({
  position, iconId, parentContainer,
}: NodeProps) => {
  const container = useRef(new Group());
  const nodeIcon = useNodeIcon();

  useEffect(() => {
    const nodeIconContainer = nodeIcon.init();

    container.current.removeChildren();
    container.current.addChild(nodeIconContainer);
    parentContainer.addChild(container.current);
  }, [nodeIcon.init]);

  useEffect(() => {
    nodeIcon.update(iconId);
  }, [iconId, nodeIcon.update]);

  useEffect(() => {
    container.current.position.set(position);
  }, [position]);

  return null;
};
