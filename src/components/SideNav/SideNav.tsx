import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { useUiStateStore, SidebarTypeEnum } from 'src/stores/useUiStateStore';
import { IconButton } from '../IconButton/IconButton';

export const SideNav = () => {
  const theme = useTheme();
  const sidebar = useUiStateStore((state) => state.sidebar);
  const uiStateActions = useUiStateStore((state) => state.actions);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: theme.customVars.sideNav,
        height: '100vh',
        bgcolor: 'grey.900'
      }}
    >
      <IconButton
        name="Settings"
        Icon={<SettingsIcon />}
        isActive={sidebar?.type === SidebarTypeEnum.PROJECT_SETTINGS}
        onClick={() =>
          uiStateActions.setSidebar({ type: SidebarTypeEnum.PROJECT_SETTINGS })
        }
        size={theme.customVars.sideNav.width}
        tooltipPosition="right"
      />
    </Box>
  );
};
