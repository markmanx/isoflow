import React, { useRef, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { Node as NodeI, IconInput, TileOriginEnum } from 'src/types';
import { getColorVariant, getRectangleFromSize } from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useProjectedTileSize } from 'src/hooks/useProjectedTileSize';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { LabelContainer } from './LabelContainer';
import { MarkdownLabel } from './LabelTypes/MarkdownLabel';
import { NodeIcon } from './NodeIcon';

interface Props {
  node: NodeI;
  icon?: IconInput;
  order: number;
}

export const Node = ({ node, icon, order }: Props) => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const nodeRef = useRef<HTMLDivElement>();
  const projectedTileSize = useProjectedTileSize();
  const { getTilePosition } = useGetTilePosition();

  const onImageLoaded = useCallback(() => {
    if (!nodeRef.current) return;

    nodeRef.current.style.opacity = '1';
  }, []);

  const position = useMemo(() => {
    return getTilePosition({
      tile: node.position,
      origin: TileOriginEnum.BOTTOM
    });
  }, [node.position, getTilePosition]);

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: order
      }}
    >
      <Box
        ref={nodeRef}
        sx={{
          position: 'absolute',
          opacity: 0,
          left: position.x,
          top: position.y
        }}
      >
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
          <LabelContainer
            labelHeight={node.labelHeight + 100}
            tileSize={projectedTileSize}
            connectorDotSize={5 * zoom}
          >
            {node.label && <MarkdownLabel label={node.label} />}
          </LabelContainer>
        </Box>
        {icon && (
          <Box
            sx={{
              position: 'absolute'
            }}
          >
            <NodeIcon icon={icon} onImageLoaded={onImageLoaded} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
