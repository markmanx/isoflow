import React, { useEffect, useRef, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { MoreHoriz as ReadMoreIcon } from '@mui/icons-material';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useTileSize } from 'src/hooks/useTileSize';
import { Gradient } from 'src/components/Gradient/Gradient';

const MAX_LABEL_HEIGHT = 125;

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
  const { projectedTileSize } = useTileSize();
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
          borderColor: 'grey.400',
          borderRadius: 2,
          left: -contentSize.width * 0.5,
          top: -(contentSize.height + labelHeight + yOffset),
          py: 1,
          px: 1.5,
          overflow: 'hidden',
          maxHeight: MAX_LABEL_HEIGHT
        }}
      >
        {children}
        {contentSize.height >= MAX_LABEL_HEIGHT - 10 && (
          <Box
            sx={{
              position: 'absolute',
              height: 50,
              width: '100%',
              bottom: 0,
              left: 0
            }}
          >
            <Gradient
              sx={{ position: 'absolute', width: '100%', height: '100%' }}
            />

            <Button
              sx={{
                position: 'absolute',
                px: 0.5,
                py: 0,
                height: 'auto',
                minWidth: 0,
                fontSize: '0.7em',
                bottom: 5,
                right: 5,
                color: 'common.white'
              }}
            >
              <ReadMoreIcon sx={{ color: 'common.white' }} />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
