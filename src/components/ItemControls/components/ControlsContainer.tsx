import React from 'react';
import { Box } from '@mui/material';

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const ControlsContainer = ({ header, children }: Props) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ width: '100%', boxShadow: 6, zIndex: 1 }}>{header}</Box>
      <Box
        sx={{
          width: '100%',
          overflowY: 'scroll',
          flexGrow: 1,
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <Box sx={{ width: '100%', pb: 6 }}>{children}</Box>
      </Box>
    </Box>
  );
};
