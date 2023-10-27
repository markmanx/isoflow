import React, { useMemo } from 'react';
import { useTheme, Box } from '@mui/material';
import { UNPROJECTED_TILE_SIZE } from 'src/config';
import { getAnchorTile, CoordsUtils, getColorVariant } from 'src/utils';
import { Circle } from 'src/components/Circle/Circle';
import { Svg } from 'src/components/Svg/Svg';
import { useIsoProjection } from 'src/hooks/useIsoProjection';
import { useConnector } from 'src/hooks/useConnector';
import { useScene } from 'src/hooks/useScene';

interface Props {
  connector: ReturnType<typeof useScene>['connectors'][0];
}

export const Connector = ({ connector: _connector }: Props) => {
  const theme = useTheme();
  const { currentView } = useScene();
  const connector = useConnector(_connector.id);
  const { css, pxSize } = useIsoProjection({
    ...connector.path.rectangle
  });

  const drawOffset = useMemo(() => {
    return {
      x: UNPROJECTED_TILE_SIZE / 2,
      y: UNPROJECTED_TILE_SIZE / 2
    };
  }, []);

  const pathString = useMemo(() => {
    return connector.path.tiles.reduce((acc, tile) => {
      return `${acc} ${tile.x * UNPROJECTED_TILE_SIZE + drawOffset.x},${
        tile.y * UNPROJECTED_TILE_SIZE + drawOffset.y
      }`;
    }, '');
  }, [connector.path.tiles, drawOffset]);

  const anchorPositions = useMemo(() => {
    return connector.anchors.map((anchor) => {
      const position = getAnchorTile(anchor, currentView);

      return {
        id: anchor.id,
        x:
          (connector.path.rectangle.from.x - position.x) *
          UNPROJECTED_TILE_SIZE,
        y:
          (connector.path.rectangle.from.y - position.y) * UNPROJECTED_TILE_SIZE
      };
    });
  }, [currentView, connector.path.rectangle, connector.anchors]);

  const connectorWidthPx = useMemo(() => {
    return (UNPROJECTED_TILE_SIZE / 100) * connector.width;
  }, [connector.width]);

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
    <Box style={css}>
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
            <g key={anchor.id}>
              <Circle
                tile={CoordsUtils.add(anchor, drawOffset)}
                radius={18}
                fill={theme.palette.common.white}
                fillOpacity={0.7}
              />
              <Circle
                tile={CoordsUtils.add(anchor, drawOffset)}
                radius={12}
                stroke={theme.palette.common.black}
                fill={theme.palette.common.white}
                strokeWidth={6}
              />
            </g>
          );
        })}
      </Svg>
    </Box>
  );
};
