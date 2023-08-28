import React from 'react';
import { UiElement } from 'src/components/UiElement/UiElement';
import { IconButton } from 'src/components/IconButton/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';

export const MainMenu = () => {
  return (
    <UiElement>
      <IconButton Icon={<MenuIcon />} name="Main menu" onClick={() => {}} />
    </UiElement>
  );
};
