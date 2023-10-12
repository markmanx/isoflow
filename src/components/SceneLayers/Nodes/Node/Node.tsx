import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Node as NodeI, TileOriginEnum } from 'src/types';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { getTilePosition } from 'src/utils';
import { useIcon } from 'src/hooks/useIcon';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';
import { LabelContainer } from './LabelContainer';

interface Props {
  node: NodeI;
  order: number;
}

export const Node = ({ node, order }: Props) => {
  const theme = useTheme();
  const { iconComponent } = useIcon(node.icon);

  const position = useMemo(() => {
    return getTilePosition({
      tile: node.tile,
      origin: TileOriginEnum.BOTTOM
    });
  }, [node.tile]);

  const description = useMemo(() => {
    if (node.description === undefined || node.description === '<p><br></p>')
      return null;

    return node.description;
  }, [node.description]);

  return (
    <Box
      style={{
        position: 'absolute',
        zIndex: order
      }}
    >
      <Box
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y
        }}
      >
        {(node.label || description) && (
          <>
            <Box
              style={{
                position: 'absolute',
                top: -PROJECTED_TILE_SIZE.height
              }}
            />
            <LabelContainer labelHeight={node.labelHeight} connectorDotSize={3}>
              {node.label && (
                <Typography fontWeight={600}>{node.label}</Typography>
              )}
              {description && (
                <Box sx={{ pt: 0.2, width: 200 }}>
                  <MarkdownEditor
                    readOnly
                    value={node.description}
                    styles={{
                      color: theme.palette.text.secondary
                    }}
                  />
                </Box>
              )}
            </LabelContainer>
          </>
        )}
        {iconComponent && (
          <Box
            sx={{
              position: 'absolute',
              pointerEvents: 'none'
            }}
          >
            {iconComponent}
          </Box>
        )}
      </Box>
    </Box>
  );
};
