import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useScene } from 'src/hooks/useScene';
import { connectorPathTileToGlobal, getTilePosition } from 'src/utils';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Label } from 'src/components/Label/Label';

interface Props {
  connector: ReturnType<typeof useScene>['connectors'][0];
}

export const ConnectorLabel = ({ connector }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });

  const labelPosition = useMemo(() => {
    const tileIndex = Math.floor(connector.path.tiles.length / 2);
    const tile = connector.path.tiles[tileIndex];

    return getTilePosition({
      tile: connectorPathTileToGlobal(tile, connector.path.rectangle.from)
    });
  }, [connector.path]);

  return (
    <Box
      sx={{ position: 'absolute', pointerEvents: 'none' }}
      style={{
        maxWidth: PROJECTED_TILE_SIZE.width,
        left: labelPosition.x,
        top: labelPosition.y
      }}
    >
      <Label maxWidth={150} labelHeight={0} connectorDotSize={0}>
        <Typography color="text.secondary" variant="body2">
          {connector.description}
        </Typography>
      </Label>
    </Box>
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        pointerEvents: 'none',
        bgcolor: 'common.white',
        border: 1,
        py: 0.5,
        px: 1,
        borderRadius: 1,
        borderColor: 'grey.200'
      }}
      style={{
        transform: `translate(-50%, -50%) scale(${zoom})`,
        maxWidth: PROJECTED_TILE_SIZE.width,
        left: labelPosition.x,
        top: labelPosition.y
      }}
    >
      <Typography color="text.secondary" variant="body2">
        {connector.description}
      </Typography>
    </Box>
  );
};
