import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo
} from 'react';
import gsap from 'gsap';
import { Box, useTheme } from '@mui/material';
import {
  getTranslateCSS,
  getIsoMatrixCSS,
  getTilePosition,
  getProjectedTileSize
} from 'src/utils';
import { TILE_SIZE } from 'src/config';
import { Coords, TileOriginEnum, Size } from 'src/types';

interface Props {
  tile: Coords;
  zoom: number;
}

export const Cursor = ({ tile, zoom }: Props) => {
  const theme = useTheme();
  const [isReady, setIsReady] = useState(false);
  const ref = useRef<SVGElement>();

  const projectedTileSize = useMemo<Size>(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  const tileSize = useMemo(() => {
    return TILE_SIZE * zoom;
  }, [zoom]);

  const setPosition = useCallback(
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
        origin: TileOriginEnum.CENTER,
        tileSize: projectedTileSize
      });

      gsap.to(ref.current, {
        duration: animationDuration,
        left: position.x,
        top: position.y
      });
    },
    [projectedTileSize]
  );

  useEffect(() => {
    if (!ref.current || !isReady) return;

    setPosition({ tile });
  }, [tile, setPosition, isReady]);

  useEffect(() => {
    if (!ref.current || isReady) return;

    gsap.killTweensOf(ref.current);
    setPosition({ tile, animationDuration: 0 });
    ref.current.style.opacity = '1';
    setIsReady(true);
  }, [tile, setPosition, isReady]);

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
