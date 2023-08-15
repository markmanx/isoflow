import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { Connector as ConnectorI } from 'src/types';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import { getAnchorPosition } from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { Circle } from 'src/components/Circle/Circle';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useSceneStore } from 'src/stores/sceneStore';

interface Props {
  connector: ConnectorI;
}

export const Connector = ({ connector }: Props) => {
  const theme = useTheme();
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });
  const { getTilePosition } = useGetTilePosition();
  const pathString = useMemo(() => {
    const unprojectedTileSize = UNPROJECTED_TILE_SIZE * zoom;
    return connector.path.tiles.reduce((acc, tile) => {
      return `${acc} ${tile.x * unprojectedTileSize},${
        tile.y * unprojectedTileSize
      }`;
    }, '');
  }, [zoom, connector.path.tiles]);

  const pathOrigin = useMemo(() => {
    return getTilePosition({ tile: connector.path.origin });
  }, [getTilePosition, connector.path.origin]);

  const anchorPositions = useMemo(() => {
    const unprojectedTileSize = UNPROJECTED_TILE_SIZE * zoom;

    return connector.anchors.map((anchor) => {
      const position = getAnchorPosition({ anchor, nodes });

      return {
        x: (connector.path.origin.x - position.x) * unprojectedTileSize,
        y: (connector.path.origin.y - position.y) * unprojectedTileSize
      };
    });
  }, [connector.path.origin, connector.anchors, zoom, nodes]);

  return (
    <Box
      id="connector"
      sx={{
        position: 'absolute',
        left: pathOrigin.x,
        top: pathOrigin.y
      }}
    >
      <IsoTileArea tileArea={connector.path.areaSize} zoom={zoom} fill="none">
        <polyline
          points={pathString}
          stroke={connector.color}
          strokeWidth={10 * zoom}
          fill="none"
        />
        {anchorPositions.map((anchor) => {
          return (
            <Circle
              position={anchor}
              radius={10 * zoom}
              stroke={theme.palette.common.black}
              fill={theme.palette.common.white}
              strokeWidth={4 * zoom}
            />
          );
        })}
      </IsoTileArea>
    </Box>
  );
};
