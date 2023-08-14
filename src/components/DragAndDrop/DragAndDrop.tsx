import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Coords, TileOriginEnum, IconInput } from 'src/types';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { NodeIcon } from 'src/components/Node/NodeIcon';

interface Props {
  icon: IconInput;
  tile: Coords;
}

export const DragAndDrop = ({ icon, tile }: Props) => {
  const { getTilePosition } = useGetTilePosition();

  const tilePosition = useMemo(() => {
    return getTilePosition({ tile, origin: TileOriginEnum.BOTTOM });
  }, [tile, getTilePosition]);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: tilePosition.x,
        top: tilePosition.y
      }}
    >
      <NodeIcon icon={icon} />
    </Box>
  );
};
