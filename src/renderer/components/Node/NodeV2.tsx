import React from 'react';
import { Box } from '@mui/material';

interface Props {
  iconUrl?: string;
}

export const NodeV2 = ({ iconUrl }: Props) => {
  if (!iconUrl) return null;

  return (
    <Box>
      <Box component="img" src={iconUrl} />
    </Box>
  );
};
