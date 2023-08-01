import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { Box, useTheme } from '@mui/material';
import { getTranslateCSS, getIsoMatrixCSS } from 'src/utils';

interface Props {
  position: { x: number; y: number };
  tileSize: number;
}

// TODO: Remove tilesize
export const Cursor = ({ position, tileSize }: Props) => {
  const theme = useTheme();
  const [isReady, setIsReady] = useState(false);
  const ref = useRef<SVGElement>();

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
        left: _position.x,
        top: _position.y
      });
    },
    []
  );

  useEffect(() => {
    if (!ref.current || !isReady) return;

    setPosition({ position });
  }, [position, setPosition, isReady]);

  useEffect(() => {
    if (!ref.current || isReady) return;

    gsap.killTweensOf(ref.current);
    setPosition({ position, animationDuration: 0 });
    ref.current.style.opacity = '1';
    setIsReady(true);
  }, [position, setPosition, isReady]);

  return (
    <Box
      ref={ref}
      component="svg"
      sx={{
        position: 'absolute',
        transform: `${getTranslateCSS({
          x: -(tileSize / 2),
          y: -(tileSize / 2)
        })} ${getIsoMatrixCSS()}`,
        opacity: 0
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
