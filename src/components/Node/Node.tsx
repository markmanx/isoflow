import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { Size, Coords, TileOriginEnum, Node as NodeI, Scroll } from 'src/types';
import {
  getTilePosition,
  getProjectedTileSize,
  getColorVariant
} from 'src/utils';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { LabelContainer } from './LabelContainer';
import { MarkdownLabel } from './LabelTypes/MarkdownLabel';

interface Props {
  node: NodeI;
  iconUrl?: string;
  zoom: number;
  scroll: Scroll;
}

export const Node = ({ node, iconUrl, zoom, scroll }: Props) => {
  const nodeRef = useRef<HTMLDivElement>();
  const iconRef = useRef<HTMLImageElement>();
  const { observe, size: iconSize } = useResizeObserver();

  useEffect(() => {
    if (!iconRef.current) return;

    observe(iconRef.current);
  }, [observe]);

  const projectedTileSize = useMemo<Size>(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  const moveToTile = useCallback(
    ({
      tile,
      animationDuration = 0.15
    }: {
      tile: Coords;
      animationDuration?: number;
    }) => {
      if (!nodeRef.current || !iconRef.current) return;

      const position = getTilePosition({
        tile,
        zoom,
        scroll,
        origin: TileOriginEnum.BOTTOM
      });

      gsap.to(iconRef.current, {
        duration: animationDuration,
        x: -iconRef.current.width * 0.5,
        y: -iconRef.current.height
      });

      gsap.to(nodeRef.current, {
        duration: animationDuration,
        x: position.x,
        y: position.y
      });
    },
    [zoom, scroll]
  );

  const onImageLoaded = useCallback(() => {
    if (!nodeRef.current || !iconRef.current) return;

    gsap.killTweensOf(nodeRef.current);
    moveToTile({ tile: node.position, animationDuration: 0 });
    nodeRef.current.style.opacity = '1';
  }, [node.position, moveToTile]);

  useEffect(() => {
    moveToTile({ tile: node.position, animationDuration: 0 });
  }, [node.position, moveToTile]);

  return (
    <Box
      ref={nodeRef}
      sx={{
        position: 'absolute',
        opacity: 0
      }}
    >
      <Box
        sx={{
          position: 'absolute'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -projectedTileSize.height
          }}
        >
          <IsoTileArea
            tileArea={{
              width: 1,
              height: 1
            }}
            fill={node.color}
            cornerRadius={15 * zoom}
            stroke={{
              width: 1 * zoom,
              color: getColorVariant(node.color, 'dark', { grade: 1.5 })
            }}
            zoom={zoom}
          />
        </Box>
        <LabelContainer
          labelHeight={node.labelHeight + iconSize.height}
          tileSize={projectedTileSize}
          connectorDotSize={5 * zoom}
        >
          {node.label && <MarkdownLabel label={node.label} />}
          {node.labelComponent}
        </LabelContainer>
      </Box>
      <Box
        component="img"
        ref={iconRef}
        onLoad={onImageLoaded}
        src={iconUrl}
        sx={{
          position: 'absolute',
          width: projectedTileSize.width,
          pointerEvents: 'none'
        }}
      />
    </Box>
  );
};
