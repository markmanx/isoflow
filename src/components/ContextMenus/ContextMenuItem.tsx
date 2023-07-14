import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const ContextMenuItem = ({ onClick, icon, label }: Props) => (
  <ListItem
    sx={{
      p: 0,
      '&:not(:last-child)': {
        borderBottom: '1px solid',
        borderBottomColor: 'grey.800',
      },
    }}
  >
    <ListItemButton onClick={onClick} sx={{ py: 0.5, px: 2 }}>
      <ListItemIcon
        sx={{
          pr: 1,
          minWidth: 'auto',
          color: 'grey.400',
          svg: {
            maxWidth: 18,
            maxHeight: 18,
          },
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText secondary={label} />
    </ListItemButton>
  </ListItem>
);
