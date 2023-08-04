import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Node, Size, Scroll, TileOriginEnum } from 'src/types';
import {
  getBoundingBox,
  sortByPosition,
  getTilePosition,
  getProjectedTileSize
} from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';

interface Props {
  nodes: Node[];
  zoom: number;
  scroll: Scroll;
}

export const Group = ({ nodes, zoom, scroll }: Props) => {
  const projectedTileSize = useMemo(() => {
    return getProjectedTileSize({ zoom });
  }, [zoom]);

  const nodePositions = useMemo(() => {
    return nodes.map((node) => {
      return node.position;
    });
  }, [nodes]);

  const groupAttrs = useMemo(() => {
    const corners = getBoundingBox(nodePositions, { x: 1, y: 1 });

    if (corners === null) return null;

    const sorted = sortByPosition(corners);
    const size: Size = {
      width: sorted.highX - sorted.lowX,
      height: sorted.highY - sorted.lowY
    };

    const position = getTilePosition({
      tile: corners[2],
      tileSize: projectedTileSize,
      scroll,
      origin: TileOriginEnum.TOP
    });

    return { size, position };
  }, [nodePositions, projectedTileSize, scroll]);

  if (!groupAttrs) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        left: groupAttrs.position.x,
        top: groupAttrs.position.y
      }}
    >
      <IsoTileArea tileArea={groupAttrs.size} fill="red" zoom={zoom} />
    </Box>
  );
};
