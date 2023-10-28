import React, { useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { PROJECTED_TILE_SIZE, DEFAULT_LABEL_HEIGHT } from 'src/config';
import { getTilePosition } from 'src/utils';
import { useIcon } from 'src/hooks/useIcon';
import { ViewItem } from 'src/types';
import { MarkdownEditor } from 'src/components/MarkdownEditor/MarkdownEditor';
import { useModelItem } from 'src/hooks/useModelItem';
import { LabelContainer } from './LabelContainer/LabelContainer';

interface Props {
  node: ViewItem;
  order: number;
}

export const Node = ({ node, order }: Props) => {
  const theme = useTheme();
  const modelItem = useModelItem(node.id);
  const { iconComponent } = useIcon(modelItem.icon);

  const position = useMemo(() => {
    return getTilePosition({
      tile: node.tile,
      origin: 'BOTTOM'
    });
  }, [node.tile]);

  const description = useMemo(() => {
    if (
      modelItem.description === undefined ||
      modelItem.description === '<p><br></p>'
    )
      return null;

    return modelItem.description;
  }, [modelItem.description]);

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: order
      }}
    >
      <Box
        sx={{ position: 'absolute' }}
        style={{
          left: position.x,
          top: position.y
        }}
      >
        {(modelItem.name || description) && (
          <>
            <Box
              style={{
                position: 'absolute',
                top: -PROJECTED_TILE_SIZE.height
              }}
            />
            <LabelContainer
              labelHeight={node.labelHeight ?? DEFAULT_LABEL_HEIGHT}
              connectorDotSize={3}
            >
              {modelItem.name && (
                <Typography fontWeight={600}>{modelItem.name}</Typography>
              )}
              {description && (
                <Box sx={{ pt: 0.2, width: 200 }}>
                  <MarkdownEditor
                    readOnly
                    value={modelItem.description}
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
