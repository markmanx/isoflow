import React, { useEffect } from 'react';
import { Box } from '@mui/material';

interface Props {
  labelHeight: number;
  children: React.ReactNode;
}

export const LabelContainer = ({ children, labelHeight }: Props) => {
  return (
    <Box
      sx={{
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
  );
};
