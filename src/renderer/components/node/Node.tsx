import { useEffect, useRef, useState } from 'react';
import { Group } from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useNodeIcon } from './useNodeIcon';
import { getTilePosition } from '../../utils/gridHelpers';

export interface NodeProps {
  position: Coords;
  iconId: string;
  parentContainer: paper.Group;
}

export const Node = ({ position, iconId, parentContainer }: NodeProps) => {
  const [isFirstDisplay, setIsFirstDisplay] = useState(true);
  const container = useRef(new Group());
  const nodeIcon = useNodeIcon();

  const {
    init: initNodeIcon,
    update: updateNodeIcon,
    isLoaded: isIconLoaded
  } = nodeIcon;

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
    if (!isIconLoaded) return;

    const tweenValues = Coords.fromObject(container.current.position);
    const endState = getTilePosition(position);

    gsap.to(tweenValues, {
      duration: isFirstDisplay ? 0 : 0.1,
      ...endState,
      onUpdate: () => {
        container.current.position.set(tweenValues);
      }
    });

    if (isFirstDisplay) setIsFirstDisplay(false);
  }, [position, isFirstDisplay, isIconLoaded]);

  return null;
};
