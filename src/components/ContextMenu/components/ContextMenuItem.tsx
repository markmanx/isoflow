import React, { useCallback } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useUiStateStore } from 'src/stores/useUiStateStore';

interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

export const ContextMenuItem = ({ onClick, icon, label }: Props) => {
  const uiStateActions = useUiStateStore((state) => state.actions);

  const onClickProxy = useCallback(() => {
    onClick();
    uiStateActions.setContextMenu(null);
  }, [onClick, uiStateActions]);

  return (
    <ListItem
      sx={{
        p: 0,
        '&:not(:last-child)': {
          borderBottom: '1px solid',
          borderBottomColor: 'grey.800'
        }
      }}
    >
      <ListItemButton onClick={onClickProxy} sx={{ py: 0.5, px: 2 }}>
        <ListItemIcon
          sx={{
            pr: 1,
            minWidth: 'auto',
            color: 'grey.400',
            svg: {
              maxWidth: 18,
              maxHeight: 18
            }
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText secondary={label} />
      </ListItemButton>
    </ListItem>
  );
};
