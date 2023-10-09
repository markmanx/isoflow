import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Node as NodeI, TileOriginEnum } from 'src/types';
import { useTileSize } from 'src/hooks/useTileSize';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { useIcon } from 'src/hooks/useIcon';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';
import { LabelContainer } from './LabelContainer';

interface Props {
  node: NodeI;
  order: number;
}

export const Node = ({ node, order }: Props) => {
  const theme = useTheme();
  const { projectedTileSize } = useTileSize();
  const { getTilePosition } = useGetTilePosition();
  const { iconComponent } = useIcon(node.icon);

  const position = useMemo(() => {
    return getTilePosition({
      tile: node.tile,
      origin: TileOriginEnum.BOTTOM
    });
  }, [node.tile, getTilePosition]);

  const description = useMemo(() => {
    if (node.description === undefined || node.description === '<p><br></p>')
      return null;

    return node.description;
  }, [node.description]);

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
        {(node.label || description) && (
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
              <Typography fontWeight={600}>{node.label}</Typography>
              {description && (
                <Box sx={{ pt: 0.2, width: 180 }}>
                  <MarkdownEditor
                    readOnly
                    value={node.description}
                    styles={{
                      color: theme.palette.text.secondary,
                      fontSize: '0.8em'
                    }}
                  />
                </Box>
              )}
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
