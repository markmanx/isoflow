import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { Size, Coords, TileOriginEnum } from 'src/types';
import { getTilePosition, getProjectedTileSize } from 'src/utils';

interface Props {
  iconUrl?: string;
  tile: Coords;
  zoom: number;
}

export const Node = ({ iconUrl, tile, zoom }: Props) => {
  const nodeRef = useRef<HTMLDivElement>();
  const iconRef = useRef<HTMLImageElement>();

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

      gsap.to(iconRef.current, { duration: 0, y: -iconRef.current.height });
      gsap.to(nodeRef.current, {
        duration: animationDuration,
        x: position.x - tileSize.width / 2,
        y: position.y - tileSize.height / 2
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
        ref={iconRef}
        onLoad={onImageLoaded}
        component="img"
        src={iconUrl}
        sx={{
          position: 'absolute',
          width: tileSize.width,
          pointerEvents: 'none'
        }}
      />
    </Box>
  );
};
