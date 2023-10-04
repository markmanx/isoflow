import React, { useMemo } from 'react';
import { useTheme, Box } from '@mui/material';
import { Connector as ConnectorI } from 'src/types';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import {
  getAnchorPosition,
  CoordsUtils,
  getColorVariant,
  getAllAnchors
} from 'src/utils';
import { Circle } from 'src/components/Circle/Circle';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useSceneStore } from 'src/stores/sceneStore';
import { Svg } from 'src/components/Svg/Svg';
import { useIsoProjection } from 'src/hooks/useIsoProjection';

interface Props {
  connector: ConnectorI;
}

export const Connector = ({ connector }: Props) => {
  const theme = useTheme();
  const { css, pxSize } = useIsoProjection({
    ...connector.path.rectangle
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const unprojectedTileSize = useMemo(() => {
    return UNPROJECTED_TILE_SIZE * zoom;
  }, [zoom]);
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });
  const connectors = useSceneStore((state) => {
    return state.connectors;
  });

  const drawOffset = useMemo(() => {
    return {
      x: unprojectedTileSize / 2,
      y: unprojectedTileSize / 2
    };
  }, [unprojectedTileSize]);

  const pathString = useMemo(() => {
    return connector.path.tiles.reduce((acc, tile) => {
      return `${acc} ${tile.x * unprojectedTileSize + drawOffset.x},${
        tile.y * unprojectedTileSize + drawOffset.y
      }`;
    }, '');
  }, [unprojectedTileSize, connector.path.tiles, drawOffset]);

  const anchorPositions = useMemo(() => {
    return connector.anchors.map((anchor) => {
      const position = getAnchorPosition({
        anchor,
        nodes,
        allAnchors: getAllAnchors(connectors)
      });

      return {
        x: (connector.path.rectangle.from.x - position.x) * unprojectedTileSize,
        y: (connector.path.rectangle.from.y - position.y) * unprojectedTileSize
      };
    });
  }, [
    connector.path.rectangle,
    connector.anchors,
    nodes,
    connectors,
    unprojectedTileSize
  ]);

  const connectorWidthPx = useMemo(() => {
    return (unprojectedTileSize / 100) * connector.width;
  }, [connector.width, unprojectedTileSize]);

  const strokeDashArray = useMemo(() => {
    switch (connector.style) {
      case 'DASHED':
        return `${connectorWidthPx * 2}, ${connectorWidthPx * 2}`;
      case 'DOTTED':
        return `0, ${connectorWidthPx * 1.8}`;
      case 'SOLID':
      default:
        return 'none';
    }
  }, [connector.style, connectorWidthPx]);

  return (
    <Box sx={css}>
      <Svg
        style={{
          // TODO: The original x coordinates of each tile seems to be calculated wrongly.
          // They are mirrored along the x-axis.  The hack below fixes this, but we should
          // try to fix this issue at the root of the problem (might have further implications).
          transform: 'scale(-1, 1)'
        }}
        viewboxSize={pxSize}
      >
        <polyline
          points={pathString}
          stroke={theme.palette.common.white}
          strokeWidth={connectorWidthPx * 1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.7}
          strokeDasharray={strokeDashArray}
          fill="none"
        />
        <polyline
          points={pathString}
          stroke={getColorVariant(connector.color, 'dark', { grade: 1 })}
          strokeWidth={connectorWidthPx}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={strokeDashArray}
          fill="none"
        />

        {anchorPositions.map((anchor) => {
          return (
            <>
              <Circle
                position={CoordsUtils.add(anchor, drawOffset)}
                radius={18 * zoom}
                fill={theme.palette.common.white}
                fillOpacity={0.7}
              />
              <Circle
                position={CoordsUtils.add(anchor, drawOffset)}
                radius={12 * zoom}
                stroke={theme.palette.common.black}
                fill={theme.palette.common.white}
                strokeWidth={6 * zoom}
              />
            </>
          );
        })}
      </Svg>
    </Box>
  );
};
