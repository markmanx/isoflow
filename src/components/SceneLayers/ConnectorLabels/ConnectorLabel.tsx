import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { Connector } from 'src/types';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { connectorPathTileToGlobal } from 'src/utils';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useTileSize } from 'src/hooks/useTileSize';

interface Props {
  connector: Connector;
}

export const ConnectorLabel = ({ connector }: Props) => {
  const { getTilePosition } = useGetTilePosition();
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const { projectedTileSize } = useTileSize();

  const labelPosition = useMemo(() => {
    const tileIndex = Math.floor(connector.path.tiles.length / 2);
    const tile = connector.path.tiles[tileIndex];

    return getTilePosition({
      tile: connectorPathTileToGlobal(tile, connector.path.rectangle.from)
    });
  }, [connector.path, getTilePosition]);

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
        maxWidth: projectedTileSize.width * (1 / zoom),
        left: labelPosition.x,
        top: labelPosition.y
      }}
    >
      <Typography color="text.secondary" variant="body2">
        {connector.label}
      </Typography>
    </Box>
  );
};
