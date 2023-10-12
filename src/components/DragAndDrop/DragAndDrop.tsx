import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Coords, TileOriginEnum, IconInput } from 'src/types';
import { getTilePosition } from 'src/utils';
import { useIcon } from 'src/hooks/useIcon';

interface Props {
  icon: IconInput;
  tile: Coords;
}

export const DragAndDrop = ({ icon, tile }: Props) => {
  const { iconComponent } = useIcon(icon.id);

  const tilePosition = useMemo(() => {
    return getTilePosition({ tile, origin: TileOriginEnum.BOTTOM });
  }, [tile]);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: tilePosition.x,
        top: tilePosition.y
      }}
    >
      {iconComponent}
    </Box>
  );
};
