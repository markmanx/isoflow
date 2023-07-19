import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { List, Box, Card } from '@mui/material';
import { keyframes } from '@emotion/react';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { getTileScreenPosition } from 'src/renderer/utils/gridHelpers';

interface Props {
  children: React.ReactNode;
  position: Coords;
}

const COLOR = 'grey.900';
const ARROW = {
  size: 11,
  top: 8
};

export const ContextMenu = ({ position, children }: Props) => {
  const container = useRef<HTMLDivElement>();
  const scroll = useUiStateStore((state) => state.scroll);
  const zoom = useUiStateStore((state) => state.zoom);

  const { position: scrollPosition } = scroll;

  useEffect(() => {
    if (!container.current) return;

    const screenPosition = getTileScreenPosition({
      position,
      scrollPosition,
      zoom
    });

    gsap.to(container.current, {
      duration: 0.1,
      left: screenPosition.x + ARROW.size * 2,
      top: screenPosition.y - 25
    });
  }, [position, scrollPosition, zoom]);

  return (
    <Box
      ref={container}
      sx={{
        position: 'absolute'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: -(ARROW.size - 2),
          top: ARROW.top,
          width: 0,
          height: 0,
          borderTop: `${ARROW.size}px solid transparent`,
          borderBottom: `${ARROW.size}px solid transparent`,
          borderRight: `${ARROW.size}px solid`,
          borderRightColor: COLOR
        }}
      />
      <Card sx={{ borderRadius: 2 }}>
        <List sx={{ p: 0 }}>{children}</List>
      </Card>
    </Box>
  );
};
