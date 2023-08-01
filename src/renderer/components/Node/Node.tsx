import React, { useEffect, useRef, useState } from 'react';
import { Group } from 'paper';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { Node as NodeInterface } from 'src/stores/useSceneStore';
import { useNodeIcon } from './useNodeIcon';
import { DefaultLabelContainer } from './DefaultLabelContainer';
import { useNodeTile } from './useNodeTile';
import { MarkdownLabel } from './LabelTypes/MarkdownLabel';
import {
  getTilePosition,
  getTileScreenPosition
} from '../../utils/gridHelpers';

export interface NodeProps {
  node: NodeInterface;
  parentContainer: paper.Group;
}

export const Node = ({ node, parentContainer }: NodeProps) => {
  const [isFirstDisplay, setIsFirstDisplay] = useState(true);
  const groupRef = useRef(new Group());
  const labelRef = useRef<HTMLDivElement>();
  const labelConnectorContainer = useRef(new Group());
  const nodeIcon = useNodeIcon();
  const nodeTile = useNodeTile();
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const [labelSize, setLabelSize] = useState({ width: 0, height: 0 });

  const {
    init: initNodeIcon,
    update: updateNodeIcon,
    isLoaded: isIconLoaded
  } = nodeIcon;
  const { init: initNodeTile, updateColor, setActive } = nodeTile;

  useEffect(() => {
    const nodeIconContainer = initNodeIcon();
    const nodeTileContainer = initNodeTile();

    groupRef.current.removeChildren();
    groupRef.current.addChild(nodeTileContainer);
    groupRef.current.addChild(labelConnectorContainer.current);
    groupRef.current.addChild(nodeIconContainer);
    groupRef.current.pivot = nodeIconContainer.bounds.bottomCenter;
    parentContainer.addChild(groupRef.current);
  }, [initNodeIcon, parentContainer, initNodeTile]);

  useEffect(() => {
    updateNodeIcon(node.iconId);
  }, [node.iconId, updateNodeIcon]);

  useEffect(() => {
    if (!isIconLoaded) return;

    const tweenValues = groupRef.current.position;
    const endState = getTilePosition(node.position);

    gsap.to(tweenValues, {
      duration: isFirstDisplay ? 0 : 0.1,
      ...endState,
      onUpdate: () => {
        groupRef.current.position.set(tweenValues);
      }
    });

    if (isFirstDisplay) setIsFirstDisplay(false);
  }, [node.position, isFirstDisplay, isIconLoaded]);

  useEffect(() => {
    if (!labelRef.current) return;

    const screenPosition = getTileScreenPosition({
      position: node.position,
      scrollPosition: scroll.position,
      zoom,
      origin: 'top'
    });

    gsap.to(labelRef.current, {
      duration: mode.type === 'PAN' ? 0 : 0.1,
      left: screenPosition.x - labelSize.width * 0.5,
      top: screenPosition.y - labelSize.height - node.labelHeight * zoom,
      scale: zoom
    });
  }, [node.position, node.labelHeight, zoom, scroll.position, mode, labelSize]);

  useEffect(() => {
    if (!labelRef.current) return;

    setLabelSize({
      width: labelRef.current.clientWidth ?? 0,
      height: labelRef.current.clientHeight ?? 0
    });
  }, [node.label, node.labelElement]);

  useEffect(() => {
    updateColor(node.color);
  }, [node.color, updateColor]);

  useEffect(() => {
    setActive(node.isSelected);
  }, [setActive, node.isSelected]);

  return (
    <Box
      ref={labelRef}
      sx={{
        position: 'absolute',
        transformOrigin: 'bottom center'
      }}
    >
      {(node.labelElement || node.label) && (
        <DefaultLabelContainer
          labelHeight={node.labelHeight}
          parentContainer={labelConnectorContainer.current}
        >
          {node.label && <MarkdownLabel label={node.label} />}
          {node.labelElement !== undefined && node.labelElement}
        </DefaultLabelContainer>
      )}
    </Box>
  );
};
