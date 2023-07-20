import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { List, Box, Card } from '@mui/material';
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
  const [firstDisplay, setFirstDisplay] = useState(false);
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
      duration: firstDisplay ? 0.1 : 0,
      left: screenPosition.x + ARROW.size * 2,
      top: screenPosition.y - 25
    });

    if (firstDisplay) {
      gsap.to(container.current, {
        duration: 0.2,
        opacity: 1,
        marginLeft: 0
      });
    }

    setFirstDisplay(true);
  }, [position, scrollPosition, zoom, firstDisplay]);

  return (
    <Box
      ref={container}
      sx={{
        position: 'absolute',
        opacity: 0,
        marginLeft: '20px'
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
