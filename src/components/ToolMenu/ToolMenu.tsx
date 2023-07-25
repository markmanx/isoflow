import React from 'react';
import { Card, useTheme } from '@mui/material';
import {
  PanTool as PanToolIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  NearMe as NearMeIcon
} from '@mui/icons-material';
import {
  useUiStateStore,
  MIN_ZOOM,
  MAX_ZOOM
} from 'src/stores/useUiStateStore';
import { IconButton } from '../IconButton/IconButton';

export const ToolMenu = () => {
  const theme = useTheme();
  const zoom = useUiStateStore((state) => state.zoom);
  const mode = useUiStateStore((state) => state.mode);
  const uiStateStoreActions = useUiStateStore((state) => state.actions);

  return (
    <Card
      sx={{
        position: 'absolute',
        top: theme.customVars.appPadding.y,
        right: theme.customVars.appPadding.x,
        height: theme.customVars.toolMenu.height,
        borderRadius: 2
      }}
    >
      <IconButton
        name="Select"
        Icon={<NearMeIcon />}
        onClick={() =>
          uiStateStoreActions.setMode({ type: 'CURSOR', mousedownItems: null })
        }
        size={theme.customVars.toolMenu.height}
        isActive={mode.type === 'CURSOR'}
      />
      <IconButton
        name="Pan"
        Icon={<PanToolIcon />}
        onClick={() => uiStateStoreActions.setMode({ type: 'PAN' })}
        size={theme.customVars.toolMenu.height}
        isActive={mode.type === 'PAN'}
      />
      <IconButton
        name="Zoom in"
        Icon={<ZoomInIcon />}
        onClick={uiStateStoreActions.incrementZoom}
        size={theme.customVars.toolMenu.height}
        disabled={zoom === MAX_ZOOM}
      />
      <IconButton
        name="Zoom out"
        Icon={<ZoomOutIcon />}
        onClick={uiStateStoreActions.decrementZoom}
        size={theme.customVars.toolMenu.height}
        disabled={zoom === MIN_ZOOM}
      />
    </Card>
  );
};
