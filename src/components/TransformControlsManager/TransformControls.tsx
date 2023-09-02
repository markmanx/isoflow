import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { Coords } from 'src/types';
import { Svg } from 'src/components/Svg/Svg';
import { TRANSFORM_CONTROLS_COLOR } from 'src/config';
import { useIsoProjection } from 'src/hooks/useIsoProjection';
import { getBoundingBox, outermostCornerPositions } from 'src/utils';
import { useGetTilePosition } from 'src/hooks/useGetTilePosition';
import { TransformAnchor } from './TransformAnchor';

interface Props {
  from: Coords;
  to: Coords;
  onMouseOver?: () => void;
  showCornerAnchors?: boolean;
}

const strokeWidth = 2;

export const TransformControls = ({
  from,
  to,
  onMouseOver,
  showCornerAnchors
}: Props) => {
  const { css, pxSize } = useIsoProjection({
    from,
    to
  });
  const { getTilePosition } = useGetTilePosition();

  const anchorPositions = useMemo<Coords[]>(() => {
    if (!showCornerAnchors) return [];

    const corners = getBoundingBox([from, to]);
    const cornerPositions = corners.map((corner, i) => {
      return getTilePosition({
        tile: corner,
        origin: outermostCornerPositions[i]
      });
    });

    return cornerPositions;
  }, [showCornerAnchors, from, to, getTilePosition]);

  return (
    <>
      <Svg
        style={css}
        onMouseOver={() => {
          onMouseOver?.();
        }}
      >
        <g transform={`translate(${strokeWidth}, ${strokeWidth})`}>
          <rect
            width={pxSize.width - strokeWidth * 2}
            height={pxSize.height - strokeWidth * 2}
            fill="none"
            stroke={TRANSFORM_CONTROLS_COLOR}
            strokeDasharray={`${strokeWidth * 2} ${strokeWidth * 2}`}
            strokeWidth={strokeWidth}
          />
        </g>
      </Svg>

      {anchorPositions.map((position) => {
        return <TransformAnchor position={position} />;
      })}
    </>
  );
};
