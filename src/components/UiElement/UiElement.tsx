import React from 'react';
import { Card, useTheme, SxProps } from '@mui/material';

interface Props {
  children: React.ReactNode;
  orientation?: 'TOPLEFT' | 'TOPRIGHT';
  sx?: SxProps;
}

export const UiElement = ({ children, sx, orientation = 'TOPLEFT' }: Props) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'absolute',
        top: theme.customVars.appPadding.y,
        [orientation === 'TOPLEFT' ? 'left' : 'right']:
          theme.customVars.appPadding.x,
        borderRadius: 2,
        ...sx
      }}
    >
      {children}
    </Card>
  );
};
