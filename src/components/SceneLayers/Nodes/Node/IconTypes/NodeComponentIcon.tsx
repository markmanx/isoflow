import React from 'react';
import { Box } from '@mui/material';
import { IconInput } from 'src/types';

interface Props {
  icon: IconInput;
}

export const NodeComponentIcon = ({ icon }: Props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        pointerEvents: 'none'
      }}
    >
      {icon.component}
    </Box>
  );
};
