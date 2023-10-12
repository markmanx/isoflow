import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Box, Button } from '@mui/material';
import { MoreHoriz as ReadMoreIcon } from '@mui/icons-material';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { Gradient } from 'src/components/Gradient/Gradient';

const STANDARD_LABEL_HEIGHT = 80;
const EXPANDED_LABEL_HEIGHT = 200;

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
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>();
  const { observe, size: contentSize } = useResizeObserver();
  const yOffset = useMemo(() => {
    return PROJECTED_TILE_SIZE.height / 2;
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    observe(contentRef.current);
  }, [observe]);

  const containerMaxHeight = useMemo(() => {
    return isExpanded ? EXPANDED_LABEL_HEIGHT : STANDARD_LABEL_HEIGHT;
  }, [isExpanded]);

  const isContentTruncated = useMemo(() => {
    return !isExpanded && contentSize.height >= STANDARD_LABEL_HEIGHT - 10;
  }, [isExpanded, contentSize.height]);

  return (
    <Box
      sx={{
        position: 'absolute',
        transformOrigin: 'top center'
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
          overflow: 'hidden'
        }}
        style={{
          overflowY: isExpanded ? 'scroll' : 'hidden',
          maxHeight: containerMaxHeight
        }}
      >
        {children}
        {isContentTruncated && (
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
              onClick={() => {
                setIsExpanded(!isExpanded);
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
