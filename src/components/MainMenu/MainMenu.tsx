import React, { useState, useCallback } from 'react';
import { Menu, Typography, Divider } from '@mui/material';
import {
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { UiElement } from 'src/components/UiElement/UiElement';
import { IconButton } from 'src/components/IconButton/IconButton';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { MenuItem } from './MenuItem';

export const MainMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMainMenuOpen = useUiStateStore((state) => {
    return state.isMainMenuOpen;
  });
  const setIsMainMenuOpen = useUiStateStore((state) => {
    return state.actions.setIsMainMenuOpen;
  });

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setIsMainMenuOpen(true);
    },
    [setIsMainMenuOpen]
  );

  const gotoGithub = useCallback(() => {
    window.open(REPOSITORY_URL, '_blank');
  }, []);

  return (
    <UiElement>
      <IconButton Icon={<MenuIcon />} name="Main menu" onClick={onClick} />

      <Menu
        anchorEl={anchorEl}
        open={isMainMenuOpen}
        onClose={() => {
          return setIsMainMenuOpen(false);
        }}
        elevation={0}
        sx={{
          mt: 1
        }}
        MenuListProps={{
          sx: {
            minWidth: '250px'
          }
        }}
      >
        <MenuItem Icon={<DownloadIcon />}>Save to...</MenuItem>
        <Divider />
        <MenuItem onClick={gotoGithub} Icon={<GitHubIcon />}>
          GitHub
        </MenuItem>
        <Divider />
        <MenuItem>
          <Typography variant="body2" color="text.secondary">
            Isoflow v{PACKAGE_VERSION}
          </Typography>
        </MenuItem>
      </Menu>
    </UiElement>
  );
};
