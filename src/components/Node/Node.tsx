import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { Size, Coords, TileOriginEnum } from 'src/types';
import { getTilePosition, getProjectedTileSize } from 'src/utils';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { LabelContainer } from './LabelContainer';
import { MarkdownLabel } from './LabelTypes/MarkdownLabel';

interface Props {
  iconUrl?: string;
  tile: Coords;
  zoom: number;
}

export const Node = ({ iconUrl, tile, zoom }: Props) => {
  const nodeRef = useRef<HTMLDivElement>();
  const iconRef = useRef<HTMLImageElement>();
  const { observe, size: iconSize } = useResizeObserver();

  useEffect(() => {
    if (!iconRef.current) return;

    observe(iconRef.current);
  }, [observe]);

  const tileSize = useMemo<Size>(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  const moveToTile = useCallback(
    ({
      tile: _tile,
      animationDuration = 0.15
    }: {
      tile: Coords;
      animationDuration?: number;
    }) => {
      if (!nodeRef.current || !iconRef.current) return;

      const position = getTilePosition({
        tile: _tile,
        tileSize,
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
    [tileSize]
  );

  const onImageLoaded = useCallback(() => {
    if (!nodeRef.current || !iconRef.current) return;

    gsap.killTweensOf(nodeRef.current);
    moveToTile({ tile, animationDuration: 0 });
    nodeRef.current.style.opacity = '1';
  }, [tile, moveToTile]);

  useEffect(() => {
    moveToTile({ tile, animationDuration: 0 });
  }, [tile, moveToTile]);

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
        <LabelContainer labelHeight={20 + iconSize.height} tileSize={tileSize}>
          <MarkdownLabel label="Hello" />
        </LabelContainer>
      </Box>
      <Box
        component="img"
        ref={iconRef}
        onLoad={onImageLoaded}
        src={iconUrl}
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          width: tileSize.width
        }}
      />
    </Box>
  );
};
