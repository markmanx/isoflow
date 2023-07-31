import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Box, useTheme } from '@mui/material';
import { getCSSMatrix } from 'src/renderer/utils/projection';

interface Props {
  position: { x: number; y: number };
  tileSize: number;
}

export const Cursor = ({ position, tileSize }: Props) => {
  const theme = useTheme();
  const ref = useRef<SVGElement>();

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      duration: 0.15,
      left: position.x,
      top: position.y
    });
  }, [position]);

  return (
    <Box
      ref={ref}
      component="svg"
      sx={{
        position: 'absolute',
        transform: `translate(${-tileSize * 0.5}px, ${
          -tileSize * 0.5
        }px) ${getCSSMatrix()}`
      }}
      width={tileSize}
      height={tileSize}
    >
      <rect
        width={tileSize}
        height={tileSize}
        fill={theme.palette.primary.main}
        opacity={0.7}
        rx={10}
      />
    </Box>
  );
};
