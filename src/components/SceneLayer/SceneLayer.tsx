import React from 'react';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
  order?: number;
}

export const SceneLayer = ({ children, order = 0 }: Props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: order,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </Box>
  );
};
