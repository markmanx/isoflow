import React, { forwardRef } from 'react';
import { Box, SxProps } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  order?: number;
  sx?: SxProps;
}

export const SceneLayer = forwardRef(
  ({ children, order = 0, sx }: Props, ref) => {
    return (
      <Box
        ref={ref}
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
      >
        {children}
      </Box>
    );
  }
);
