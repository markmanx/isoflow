import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo
} from 'react';
import { Box, useTheme } from '@mui/material';
import gsap from 'gsap';
import { getTilePosition, getProjectedTileSize } from 'src/utils';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import { Coords, TileOriginEnum, Size, Scroll } from 'src/types';
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

  const projectedTileSize = useMemo<Size>(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

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
        tileSize: projectedTileSize
      });

      gsap.to(containerRef.current, {
        duration: animationDuration,
        left: position.x,
        top: position.y
      });
    },
    [projectedTileSize, scroll]
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
      />
    </Box>
  );
};
