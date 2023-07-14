import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import PanToolIcon from '@mui/icons-material/PanTool';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import NearMeIcon from '@mui/icons-material/NearMe';
import { MenuItem } from '../MenuItem';
import { modeManagerContext } from '../../contexts/ModeManagerContext';
import { Select } from '../../modes/Select';
import { Pan } from '../../modes/Pan';
import { useZoom } from '../Renderer/useZoom';

export const ToolMenu = observer(() => {
  const modeManager = useContext(modeManagerContext);
  const theme = useTheme();
  const { incrementZoom, decrementZoom } = useZoom();

  return (
    <Card
      sx={{
        position: 'absolute',
        top: theme.spacing(4),
        right: theme.spacing(4),
        height: theme.customVars.toolMenu.height,
        borderRadius: 2,
      }}
    >
      <MenuItem
        name="Select"
        Icon={NearMeIcon}
        onClick={() => modeManager.activateMode(Select)}
        size={theme.customVars.toolMenu.height}
        isActive={modeManager.currentMode?.instance instanceof Select}
      />
      <MenuItem
        name="Pan"
        Icon={PanToolIcon}
        onClick={() => modeManager.activateMode(Pan)}
        size={theme.customVars.toolMenu.height}
        isActive={modeManager.currentMode?.instance instanceof Pan}
      />
      <MenuItem
        name="Zoom in"
        Icon={ZoomInIcon}
        onClick={incrementZoom}
        size={theme.customVars.toolMenu.height}
      />
      <MenuItem
        name="Zoom out"
        Icon={ZoomOutIcon}
        onClick={decrementZoom}
        size={theme.customVars.toolMenu.height}
      />
    </Card>
  );
});
