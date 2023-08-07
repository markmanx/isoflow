import React, { useMemo } from 'react';
import chroma from 'chroma-js';
import { Box } from '@mui/material';
import { Node, TileOriginEnum, Group as GroupI } from 'src/types';
import { getBoundingBox, getBoundingBoxSize } from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { useUiStateStore } from 'src/stores/uiStateStore';

interface Props {
  nodes: Node[];
  group: GroupI;
}

export const Group = ({ nodes, group }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const { getTilePosition } = useGetTilePosition();
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
      origin: TileOriginEnum.TOP
    });

    return { size, position };
  }, [nodePositions, getTilePosition]);

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
