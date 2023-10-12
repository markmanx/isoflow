import React from 'react';
import { Box, SxProps } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';

interface Props {
  children?: React.ReactNode;
  order?: number;
  sx?: SxProps;
}

export const SceneLayer = ({ children, order = 0, sx }: Props) => {
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: order,
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        userSelect: 'none',
        ...sx
      }}
      style={{
        transform: `translate(${scroll.position.x}px, ${scroll.position.y}px) scale(${zoom})`
      }}
    >
      {children}
    </Box>
  );
};
