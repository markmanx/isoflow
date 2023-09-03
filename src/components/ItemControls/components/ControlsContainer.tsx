import React from 'react';
import { Box, Card, Divider } from '@mui/material';

interface Props {
  header?: React.ReactNode;
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
        flexDirection: 'column',
        pb: 2
      }}
    >
      {header && (
        <Card
          sx={{
            width: '100%',
            zIndex: 1,
            position: 'sticky',
            top: 0
          }}
        >
          {header}
          <Divider />
        </Card>
      )}
      <Box
        sx={{
          width: '100%',
          flexGrow: 1
        }}
      >
        <Box sx={{ width: '100%' }}>{children}</Box>
      </Box>
    </Box>
  );
};
