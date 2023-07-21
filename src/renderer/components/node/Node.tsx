import React, { useEffect, useRef, useState } from 'react';
import { Group } from 'paper';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { Node as NodeInterface } from 'src/stores/useSceneStore';
import { useNodeIcon } from './useNodeIcon';
import { NodeLabel } from './NodeLabel';
import { useNodeTile } from './useNodeTile';
import {
  getTilePosition,
  getTileScreenPosition
} from '../../utils/gridHelpers';
import { useLabelConnector } from './useLabelConnector';

export interface NodeProps {
  node: NodeInterface;
  parentContainer: paper.Group;
}

const isEmptyLabel = (label: string) => label === '<p><br></p>' || label === '';

export const Node = ({ node, parentContainer }: NodeProps) => {
  const [isFirstDisplay, setIsFirstDisplay] = useState(true);
  const groupRef = useRef(new Group());
  const labelRef = useRef<HTMLDivElement>();
  const nodeIcon = useNodeIcon();
  const labelConnector = useLabelConnector();
  const nodeTile = useNodeTile();
  const scroll = useUiStateStore((state) => state.scroll);
  const zoom = useUiStateStore((state) => state.zoom);
  const mode = useUiStateStore((state) => state.mode);
  const [labelSize, setLabelSize] = useState({ width: 0, height: 0 });

  const {
    init: initNodeIcon,
    update: updateNodeIcon,
    isLoaded: isIconLoaded
  } = nodeIcon;
  const {
    init: initLabelConnector,
    updateHeight: updateLabelHeight,
    setVisible: setLabelConnectorVisible
  } = labelConnector;
  const { init: initNodeTile, updateColor } = nodeTile;

  useEffect(() => {
    const nodeIconContainer = initNodeIcon();
    const labelConnectorContainer = initLabelConnector();
    const nodeTileContainer = initNodeTile();

    groupRef.current.removeChildren();
    groupRef.current.addChild(nodeTileContainer);
    groupRef.current.addChild(labelConnectorContainer);
    groupRef.current.addChild(nodeIconContainer);
    groupRef.current.pivot = nodeIconContainer.bounds.bottomCenter;
    parentContainer.addChild(groupRef.current);
  }, [initNodeIcon, parentContainer, initLabelConnector, initNodeTile]);

  useEffect(() => {
    updateNodeIcon(node.iconId);
  }, [node.iconId, updateNodeIcon]);

  useEffect(() => {
    if (!isIconLoaded) return;

    const tweenValues = Coords.fromObject(groupRef.current.position);
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
    setLabelConnectorVisible(!isEmptyLabel(node.label));

    if (!labelRef.current) return;

    setLabelSize({
      width: labelRef.current.clientWidth ?? 0,
      height: labelRef.current.clientHeight ?? 0
    });
  }, [node.label, setLabelConnectorVisible]);

  useEffect(() => {
    updateLabelHeight(node.labelHeight);
  }, [node.labelHeight, updateLabelHeight]);

  useEffect(() => {
    updateColor(node.color);
  }, [node.color, updateColor]);

  if (!node.label) return null;

  return (
    <Box
      ref={labelRef}
      sx={{
        position: 'absolute',
        transformOrigin: 'bottom center'
      }}
    >
      <NodeLabel label={node.label} />
    </Box>
  );
};
