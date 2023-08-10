import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Node, Coords, Connector as ConnectorI } from 'src/types';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import {
  findPath,
  getBoundingBox,
  getBoundingBoxSize,
  sortByPosition,
  CoordsUtils
} from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { useUiStateStore } from 'src/stores/uiStateStore';

interface Props {
  connector: ConnectorI;
  fromNode: Node;
  toNode: Node;
}

// The boundaries of the search area for the pathfinder algorithm
// is the grid that encompasses the two nodes + the offset below.
const BOUNDS_OFFSET: Coords = { x: 3, y: 3 };

export const Connector = ({ fromNode, toNode, connector }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const { getTilePosition } = useGetTilePosition();
  const route = useMemo(() => {
    const searchArea = getBoundingBox(
      [fromNode.position, toNode.position],
      BOUNDS_OFFSET
    );
    const searchAreaSize = getBoundingBoxSize(searchArea);
    const sorted = sortByPosition(searchArea);
    const topLeftTile = { x: sorted.highX, y: sorted.highY };

    const positionsNormalisedFromSearchArea = {
      from: CoordsUtils.subtract(topLeftTile, fromNode.position),
      to: CoordsUtils.subtract(topLeftTile, toNode.position)
    };

    const connectorRoute = findPath({
      from: positionsNormalisedFromSearchArea.from,
      to: positionsNormalisedFromSearchArea.to,
      gridSize: searchAreaSize
    });
    const unprojectedTileSize = UNPROJECTED_TILE_SIZE * zoom;
    const path = connectorRoute.reduce((acc, tile) => {
      return `${acc} ${tile.x * unprojectedTileSize},${
        tile.y * unprojectedTileSize
      }`;
    }, '');

    const position = getTilePosition({
      tile: topLeftTile
    });

    return { path, searchAreaSize, topLeftTile, position };
  }, [fromNode.position, toNode.position, zoom, getTilePosition]);

  return (
    <Box
      id="connector"
      sx={{
        position: 'absolute',
        left: route.position.x,
        top: route.position.y
      }}
    >
      <IsoTileArea tileArea={route.searchAreaSize} zoom={zoom} fill="none">
        <polyline
          points={route.path}
          stroke={connector.color}
          strokeWidth={10 * zoom}
          fill="none"
        />
      </IsoTileArea>
    </Box>
  );
};
