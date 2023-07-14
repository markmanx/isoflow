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
  const nodeIcon = useNodeIcon(iconId);

  useEffect(() => {
    if (!nodeIcon.container) return;

    const containerProxy = container.current;
    container.current.addChild(nodeIcon.container);
    parentContainer.addChild(container.current);

    return () => {
      containerProxy.remove();
    };
  }, []);

  useEffect(() => {
    container.current.position.set(position);
  }, [position]);

  return null;
};
