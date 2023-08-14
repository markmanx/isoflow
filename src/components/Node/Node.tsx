import React, { useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { Coords, TileOriginEnum, Node as NodeI, IconInput } from 'src/types';
import { getColorVariant } from 'src/utils';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { useProjectedTileSize } from 'src/hooks/useProjectedTileSize';
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
  const { getTilePosition } = useGetTilePosition();
  const projectedTileSize = useProjectedTileSize();

  const moveToTile = useCallback(
    ({
      tile,
      animationDuration = 0.15
    }: {
      tile: Coords;
      animationDuration?: number;
    }) => {
      if (!nodeRef.current) return;

      const position = getTilePosition({
        tile,
        origin: TileOriginEnum.BOTTOM
      });

      gsap.to(nodeRef.current, {
        duration: animationDuration,
        x: position.x,
        y: position.y
      });
    },
    [getTilePosition]
  );

  const onImageLoaded = useCallback(() => {
    if (!nodeRef.current) return;

    nodeRef.current.style.opacity = '1';
  }, []);

  useEffect(() => {
    moveToTile({ tile: node.position, animationDuration: 0 });
  }, [node.position, moveToTile]);

  return (
    <Box
      ref={nodeRef}
      sx={{
        position: 'absolute',
        zIndex: order,
        opacity: 0
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
        >
          <IsoTileArea
            tileArea={{
              width: 1,
              height: 1
            }}
            fill={node.color}
            cornerRadius={15 * zoom}
            stroke={{
              width: 1 * zoom,
              color: getColorVariant(node.color, 'dark', { grade: 1.5 })
            }}
            zoom={zoom}
          />
        </Box>
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
  );
};
