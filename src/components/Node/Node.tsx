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
  const ref = useRef<HTMLImageElement>();

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
      if (!ref.current) return;

      const position = getTilePosition({
        tile: _tile,
        tileSize,
        origin: TileOriginEnum.BOTTOM
      });

      gsap.to(ref.current, {
        duration: animationDuration,
        x: position.x - tileSize.width / 2,
        y: position.y - tileSize.height / 2 - ref.current.height
      });
    },
    [tileSize]
  );

  const onImageLoaded = useCallback(() => {
    if (!ref.current) return;

    gsap.killTweensOf(ref.current);
    moveToTile({ tile, animationDuration: 0 });
    ref.current.style.opacity = '1';
  }, [tile, moveToTile]);

  useEffect(() => {
    moveToTile({ tile, animationDuration: 0 });
  }, [tile, moveToTile]);

  return (
    <Box
      ref={ref}
      onLoad={onImageLoaded}
      component="img"
      src={iconUrl}
      sx={{
        position: 'absolute',
        width: tileSize.width,
        pointerEvents: 'none',
        opacity: 0
      }}
    />
  );
};
