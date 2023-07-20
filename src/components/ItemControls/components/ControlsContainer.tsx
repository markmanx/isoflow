import React from 'react';
import Box from '@mui/material/Box';

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const ControlsContainer = ({ header, children }: Props) => (
  <Box
    sx={{
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
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)'
        }
      }}
    >
      <Box sx={{ width: '100%', pb: 6 }}>{children}</Box>
    </Box>
  </Box>
);
