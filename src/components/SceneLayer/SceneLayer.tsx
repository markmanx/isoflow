import React, { forwardRef } from 'react';
import { Box } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  order?: number;
}

export const SceneLayer = forwardRef(({ children, order = 0 }: Props, ref) => {
  return (
    <Box
      ref={ref}
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
});
