import React, { useRef, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { Coords, TileOriginEnum } from 'src/types';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';

interface Props {
  tile: Coords;
}

export const Cursor = ({ tile }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>();
  const { getTilePosition } = useGetTilePosition();

  const position = useMemo(() => {
    return getTilePosition({ tile, origin: TileOriginEnum.TOP });
  }, [getTilePosition, tile]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        left: position.x,
        top: position.y
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
