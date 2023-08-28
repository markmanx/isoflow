import React from 'react';
import { Card, useTheme, SxProps } from '@mui/material';

interface Props {
  children: React.ReactNode;
  sx?: SxProps;
}

export const Menu = ({ children, sx }: Props) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'absolute',
        top: theme.customVars.appPadding.y,
        right: theme.customVars.appPadding.x,
        height: theme.customVars.toolMenu.height,
        borderRadius: 2,
        ...sx
      }}
    >
      {children}
    </Card>
  );
};
