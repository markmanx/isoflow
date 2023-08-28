import React from 'react';
import { MenuItem as MuiMenuItem, ListItemIcon } from '@mui/material';

export interface Props {
  onClick?: () => void;
  Icon?: React.ReactNode;
  children: string | React.ReactNode;
}

export const MenuItem = ({ onClick, Icon, children }: Props) => {
  return (
    <MuiMenuItem onClick={onClick}>
      <ListItemIcon>{Icon}</ListItemIcon>
      {children}
    </MuiMenuItem>
  );
};
