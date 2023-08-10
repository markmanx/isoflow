import React from 'react';
import { Box } from '@mui/material';

interface Props {
  children: React.ReactNode;
  order?: number;
}

export const SceneLayer = ({ children, order = 0 }: Props) => {
  return <Box sx={{ position: 'absolute', zIndex: order }}>{children}</Box>;
};
