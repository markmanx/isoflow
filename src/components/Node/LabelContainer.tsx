import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Box } from '@mui/material';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { Size } from 'src/types';

interface Props {
  labelHeight: number;
  tileSize: Size;
  children: React.ReactNode;
}

const connectorWidth = 4;

export const LabelContainer = ({ children, labelHeight, tileSize }: Props) => {
  const contentRef = useRef<HTMLDivElement>();
  const { observe, size: contentSize } = useResizeObserver();

  useEffect(() => {
    if (!contentRef.current) return;

    observe(contentRef.current);
  }, [observe]);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      duration: 0,
      x: -contentSize.width * 0.5,
      y: -(contentSize.height + labelHeight)
    });
  }, [contentSize, labelHeight]);

  return (
    <Box
      sx={{
        position: 'absolute',
        width: 10,
        height: 10
      }}
    >
      <Box
        component="svg"
        sx={{
          position: 'absolute',
          top: -(labelHeight + tileSize.height / 2),
          left: -connectorWidth / 2
        }}
      >
        <line
          x1={connectorWidth / 2}
          y1={tileSize.height / 2}
          x2={connectorWidth / 2}
          y2={labelHeight}
          strokeDasharray={`0, ${connectorWidth * 2}`}
          stroke="black"
          strokeWidth={connectorWidth}
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
          overflow: 'hidden',
          py: 1,
          px: 1.5
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
