import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { PROJECTED_TILE_DIMENSIONS } from 'src/config';
import { Size } from 'src/types';

interface Props {
  iconUrl?: string;
  position: { x: number; y: number };
  zoom: number;
}

export const Node = ({ iconUrl, position, zoom }: Props) => {
  const ref = useRef<HTMLImageElement>();

  const tileSize = useMemo<Size>(() => {
    return {
      width: PROJECTED_TILE_DIMENSIONS.width * zoom,
      height: PROJECTED_TILE_DIMENSIONS.height * zoom
    };
  }, [zoom]);

  const setPosition = useCallback(
    ({
      position: _position,
      animationDuration = 0.15
    }: {
      position: { x: number; y: number };
      animationDuration?: number;
    }) => {
      if (!ref.current) return;

      gsap.to(ref.current, {
        duration: animationDuration,
        x: _position.x - tileSize.width / 2,
        y: _position.y - tileSize.height / 2 - ref.current.height
      });
    },
    [tileSize]
  );

  useEffect(() => {
    if (!ref.current) return;

    setPosition({ position });
  }, [position, setPosition]);

  const onImageLoaded = useCallback(() => {
    if (!ref.current) return;

    gsap.killTweensOf(ref.current);
    setPosition({ position, animationDuration: 0 });
    ref.current.style.opacity = '1';
  }, [position, setPosition]);

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
