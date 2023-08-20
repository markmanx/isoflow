import React, { useEffect, useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useProjectedTileSize } from 'src/hooks/useProjectedTileSize';

interface Props {
  labelHeight: number;
  children: React.ReactNode;
  connectorDotSize: number;
}

export const LabelContainer = ({
  children,
  labelHeight,
  connectorDotSize
}: Props) => {
  const contentRef = useRef<HTMLDivElement>();
  const { observe, size: contentSize } = useResizeObserver();
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const projectedTileSize = useProjectedTileSize();
  const yOffset = useMemo(() => {
    return projectedTileSize.height / 2;
  }, [projectedTileSize]);

  useEffect(() => {
    if (!contentRef.current) return;

    observe(contentRef.current);
  }, [observe]);

  return (
    <Box
      sx={{
        position: 'absolute',
        transformOrigin: 'top center',
        transform: `scale(${zoom})`
      }}
    >
      <Box
        component="svg"
        viewBox={`0 0 ${connectorDotSize} ${labelHeight}`}
        width={connectorDotSize}
        sx={{
          position: 'absolute',
          top: -(labelHeight + yOffset),
          left: -connectorDotSize / 2
        }}
      >
        <line
          x1={connectorDotSize / 2}
          y1={0}
          x2={connectorDotSize / 2}
          y2={labelHeight}
          strokeDasharray={`0, ${connectorDotSize * 2}`}
          stroke="black"
          strokeWidth={connectorDotSize}
          strokeLinecap="round"
        />
      </Box>
      <Box
        ref={contentRef}
        sx={{
          position: 'absolute',
          bgcolor: 'common.white',
          border: '1px solid',
          borderColor: 'grey.500',
          borderRadius: 2,
          left: -contentSize.width * 0.5,
          top: -(contentSize.height + labelHeight + yOffset),
          py: 1,
          px: 1.5,
          overflow: 'hidden'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
