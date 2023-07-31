import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { PROJECTED_TILE_DIMENSIONS } from 'src/renderer/utils/constants';

interface Props {
  iconUrl?: string;
  position: { x: number; y: number };
}

export const NodeV2 = ({ iconUrl, position }: Props) => {
  const ref = useRef<HTMLImageElement>();

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      duration: 0.15,
      x: position.x - PROJECTED_TILE_DIMENSIONS.x / 2,
      y: position.y - PROJECTED_TILE_DIMENSIONS.y / 2 - ref.current.height
    });
  }, [position]);

  return (
    <Box
      ref={ref}
      component="img"
      src={iconUrl}
      sx={{
        position: 'absolute',
        width: PROJECTED_TILE_DIMENSIONS.x,
        pointerEvents: 'none'
      }}
    />
  );
};
