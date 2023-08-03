import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo
} from 'react';
import gsap from 'gsap';
import { useTheme } from '@mui/material';
import { getTilePosition, getProjectedTileSize } from 'src/utils';
import { TILE_SIZE } from 'src/config';
import { Coords, TileOriginEnum, Size, Scroll } from 'src/types';
import { IsoTile } from 'src/components/IsoTile/IsoTile';

interface Props {
  tile: Coords;
  scroll: Scroll;
  zoom: number;
}

export const Cursor = ({ tile, zoom, scroll }: Props) => {
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
        scroll,
        tileSize: projectedTileSize
      });

      gsap.to(ref.current, {
        duration: animationDuration,
        left: position.x,
        top: position.y
      });
    },
    [projectedTileSize, scroll]
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
    <IsoTile ref={ref} fill={theme.palette.primary.main} size={tileSize} />
  );
};
