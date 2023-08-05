import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Connector as ConnectorI, Node, Coords, Scroll, Size } from 'src/types';
import { Svg } from 'src/components/Svg/Svg';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import {
  pathfinder,
  getBoundingBox,
  getBoundingBoxSize,
  getTilePosition
} from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';

interface Props {
  connector: ConnectorI;
  fromNode: Node;
  toNode: Node;
  scroll: Scroll;
  zoom: number;
}

// How far a connector can be outside the grid area that covers two nodes
const BOUNDS_OFFSET: Coords = { x: 3, y: 3 };

export const Connector = ({
  connector,
  fromNode,
  toNode,
  zoom,
  scroll
}: Props) => {
  const connectorParams = useMemo(() => {
    const searchArea = getBoundingBox(
      [fromNode.position, toNode.position],
      BOUNDS_OFFSET
    );
    const searchAreaSize = getBoundingBoxSize(searchArea);
    const { findPath } = pathfinder(searchAreaSize);

    const connectorRoute = findPath([fromNode.position, toNode.position]);
    const connectorAreaSize = getBoundingBoxSize(connectorRoute);
    const unprojectedTileSize = UNPROJECTED_TILE_SIZE * zoom;
    const path = connectorRoute.reduce((acc, tile) => {
      return `${acc} ${tile.x * unprojectedTileSize},${
        tile.y * unprojectedTileSize
      }`;
    }, '');
    const position = getTilePosition({
      tile: fromNode.position,
      zoom,
      scroll
    });

    return { path, connectorAreaSize, position };
  }, [fromNode.position, toNode.position, zoom, scroll]);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: connectorParams.position.x,
        top: connectorParams.position.y
      }}
    >
      <IsoTileArea
        tileArea={connectorParams.connectorAreaSize}
        zoom={zoom}
        fill="none"
      >
        <polyline
          points={connectorParams.path}
          stroke="black"
          strokeWidth={10 * zoom}
          fill="none"
        />
      </IsoTileArea>
    </Box>
  );
};
