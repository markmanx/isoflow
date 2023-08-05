import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import gsap from 'gsap';
import { getTilePosition } from 'src/utils';
import { Coords, TileOriginEnum, Scroll } from 'src/types';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';

interface Props {
  tile: Coords;
  scroll: Scroll;
  zoom: number;
}

export const Cursor = ({ tile, zoom, scroll }: Props) => {
  const theme = useTheme();
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>();

  const setPosition = useCallback(
    ({
      tile: _tile,
      animationDuration = 0.15
    }: {
      tile: Coords;
      animationDuration?: number;
    }) => {
      if (!containerRef.current) return;

      const position = getTilePosition({
        tile: _tile,
        origin: TileOriginEnum.TOP,
        scroll,
        zoom
      });

      gsap.to(containerRef.current, {
        duration: animationDuration,
        left: position.x,
        top: position.y
      });
    },
    [zoom, scroll]
  );

  useEffect(() => {
    if (!containerRef.current || !isReady) return;

    setPosition({ tile });
  }, [tile, setPosition, isReady]);

  useEffect(() => {
    if (!containerRef.current || isReady) return;

    gsap.killTweensOf(containerRef.current);
    setPosition({ tile, animationDuration: 0 });
    containerRef.current.style.opacity = '1';
    setIsReady(true);
  }, [tile, setPosition, isReady]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute'
      }}
    >
      <IsoTileArea
        fill={theme.palette.primary.main}
        tileArea={{ width: 1, height: 1 }}
        zoom={zoom}
        cornerRadius={10 * zoom}
      />
    </Box>
  );
};
