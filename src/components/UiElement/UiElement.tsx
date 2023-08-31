import React from 'react';
import { Card, SxProps } from '@mui/material';

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

export const UiElement = ({ children, sx }: Props) => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        ...sx
      }}
    >
      {children}
    </Card>
  );
};
