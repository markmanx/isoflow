import { useEffect, useRef } from 'react';
import { Group } from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useNodeIcon } from './useNodeIcon';
import { getTilePosition } from '../../utils/gridHelpers';

export interface NodeProps {
  position: { x: number; y: number };
  iconId: string;
  parentContainer: paper.Group;
}

export const Node = ({ position, iconId, parentContainer }: NodeProps) => {
  const container = useRef(new Group());
  const nodeIcon = useNodeIcon();

  const { init: initNodeIcon, update: updateNodeIcon } = nodeIcon;

  useEffect(() => {
    const nodeIconContainer = initNodeIcon();

    container.current.removeChildren();
    container.current.addChild(nodeIconContainer);
    parentContainer.addChild(container.current);
  }, [initNodeIcon, parentContainer]);

  useEffect(() => {
    updateNodeIcon(iconId);
  }, [iconId, updateNodeIcon]);

  useEffect(() => {
    const oldPosition = new Coords(
      container.current.position.x,
      container.current.position.y
    );
    const newPosition = getTilePosition(new Coords(position.x, position.y));

    gsap.to(oldPosition, {
      duration: 0.1,
      ...newPosition,
      onUpdate: () => {
        container.current.position.set(oldPosition);
      }
    });
  }, [position]);

  return null;
};
