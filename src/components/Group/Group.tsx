import React, { useMemo } from 'react';
import chroma from 'chroma-js';
import { Box } from '@mui/material';
import { Node, Scroll, TileOriginEnum, Group as GroupI } from 'src/types';
import { getBoundingBox, getTilePosition, getBoundingBoxSize } from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';

interface Props {
  nodes: Node[];
  group: GroupI;
  zoom: number;
  scroll: Scroll;
}

export const Group = ({ nodes, zoom, scroll, group }: Props) => {
  const nodePositions = useMemo(() => {
    return nodes.map((node) => {
      return node.position;
    });
  }, [nodes]);

  const groupAttrs = useMemo(() => {
    const corners = getBoundingBox(nodePositions, { x: 1, y: 1 });
    const size = getBoundingBoxSize(corners);

    const position = getTilePosition({
      tile: corners[2],
      zoom,
      scroll,
      origin: TileOriginEnum.TOP
    });

    return { size, position };
  }, [nodePositions, zoom, scroll]);

  if (!groupAttrs) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        left: groupAttrs.position.x,
        top: groupAttrs.position.y
      }}
    >
      <IsoTileArea
        tileArea={groupAttrs.size}
        fill={chroma(group.color).alpha(0.6).css()}
        zoom={zoom}
        cornerRadius={22 * zoom}
        stroke={{
          color: group.color,
          width: 1 * zoom
        }}
      />
    </Box>
  );
};
