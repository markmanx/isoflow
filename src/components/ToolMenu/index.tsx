import React from 'react';
import { observer } from 'mobx-react';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import PanToolIcon from '@mui/icons-material/PanTool';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import NearMeIcon from '@mui/icons-material/NearMe';
import { MenuItem } from '../MenuItem';
import { useZoom } from '../Renderer/useZoom';
import { useAppState } from '../Renderer/useAppState';

export const ToolMenu = observer(() => {
  const theme = useTheme();
  const { incrementZoom, decrementZoom, canIncrement, canDecrement } =
    useZoom();
  const mode = useAppState((state) => state.mode);
  const setMode = useAppState((state) => state.setMode);

  return (
    <Card
      sx={{
        position: 'absolute',
        top: theme.spacing(4),
        right: theme.spacing(4),
        height: theme.customVars.toolMenu.height,
        borderRadius: 2
      }}
    >
      <MenuItem
        name="Select"
        Icon={NearMeIcon}
        onClick={() => setMode({ type: 'SELECT' })}
        size={theme.customVars.toolMenu.height}
        isActive={mode.type === 'SELECT'}
      />
      <MenuItem
        name="Pan"
        Icon={PanToolIcon}
        onClick={() => setMode({ type: 'PAN' })}
        size={theme.customVars.toolMenu.height}
        isActive={mode.type === 'PAN'}
      />
      <MenuItem
        name="Zoom in"
        Icon={ZoomInIcon}
        onClick={incrementZoom}
        size={theme.customVars.toolMenu.height}
        disabled={canIncrement}
      />
      <MenuItem
        name="Zoom out"
        Icon={ZoomOutIcon}
        onClick={decrementZoom}
        size={theme.customVars.toolMenu.height}
        disabled={canDecrement}
      />
    </Card>
  );
});
