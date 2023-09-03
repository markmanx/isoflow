import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { Node as NodeI, TileOriginEnum } from 'src/types';
import { useTileSize } from 'src/hooks/useTileSize';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { useIcon } from 'src/hooks/useIcon';
import { LabelContainer } from './LabelContainer';
import { MarkdownLabel } from './LabelTypes/MarkdownLabel';

interface Props {
  node: NodeI;
  order: number;
}

export const Node = ({ node, order }: Props) => {
  const { projectedTileSize } = useTileSize();
  const { getTilePosition } = useGetTilePosition();
  const { iconComponent } = useIcon(node.iconId);

  const position = useMemo(() => {
    return getTilePosition({
      tile: node.position,
      origin: TileOriginEnum.BOTTOM
    });
  }, [node.position, getTilePosition]);

  const label = useMemo(() => {
    if (node.label === undefined || node.label === '<p><br></p>') return null;

    return node.label;
  }, [node.label]);

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: order
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: position.x,
          top: position.y
        }}
      >
        {label && (
          <Box
            sx={{
              position: 'absolute'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -projectedTileSize.height
              }}
            />
            <LabelContainer labelHeight={node.labelHeight} connectorDotSize={3}>
              <MarkdownLabel label={label} />
            </LabelContainer>
          </Box>
        )}
        {iconComponent && (
          <Box
            sx={{
              position: 'absolute'
            }}
          >
            {iconComponent}
          </Box>
        )}
      </Box>
    </Box>
  );
};
