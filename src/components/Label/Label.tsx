import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { ExpandButton } from './ExpandButton';

interface Props {
  labelHeight?: number;
  maxWidth: number;
  maxHeight?: number;
  expandDirection?: 'CENTER' | 'BOTTOM';
  children: React.ReactNode;
  connectorDotSize: number;
}

export const Label = ({
  children,
  maxWidth,
  maxHeight,
  expandDirection = 'CENTER',
  labelHeight = 0,
  connectorDotSize
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>();

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [isExpanded]);

  return (
    <Box
      sx={{
        position: 'absolute',
        width: maxWidth
      }}
    >
      {labelHeight > 0 && (
        <Box
          component="svg"
          viewBox={`0 0 ${connectorDotSize} ${labelHeight}`}
          width={connectorDotSize}
          sx={{
            position: 'absolute',
            top: -labelHeight,
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
      )}

      <Box
        ref={contentRef}
        sx={{
          position: 'absolute',
          display: 'inline-block',
          bgcolor: 'common.white',
          border: '1px solid',
          borderColor: 'grey.400',
          borderRadius: 2,
          py: 1,
          px: 1.5,
          transformOrigin: 'bottom center',
          transform: `translate(-50%, ${
            expandDirection === 'BOTTOM' ? '-100%' : '-50%'
          })`,
          overflow: 'hidden'
        }}
        style={{
          maxHeight,
          top: -labelHeight
        }}
      >
        {children}

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0
          }}
        >
          {isExpanded && (
            <ExpandButton
              isExpanded={isExpanded}
              onClick={() => {
                setIsExpanded(false);
              }}
            />
          )}
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
};
