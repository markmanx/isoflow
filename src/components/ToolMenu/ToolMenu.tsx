import React from 'react';
import { Card, useTheme } from '@mui/material';
import {
  PanTool as PanToolIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  NearMe as NearMeIcon,
  CenterFocusStrong as CenterFocusStrongIcon
} from '@mui/icons-material';
import {
  useUiStateStore,
  MIN_ZOOM,
  MAX_ZOOM
} from 'src/stores/useUiStateStore';
import { useDiagramUtils } from 'src/hooks/useDiagramUtils';
import { IconButton } from '../IconButton/IconButton';

export const ToolMenu = () => {
  const theme = useTheme();
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const uiStateStoreActions = useUiStateStore((state) => {
    return state.actions;
  });
  const { fitDiagramToScreen } = useDiagramUtils();

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
        onClick={() => {
          return uiStateStoreActions.setMode({
            type: 'CURSOR',
            showCursor: true,
            mousedown: null
          });
        }}
        size={theme.customVars.toolMenu.height}
        isActive={mode.type === 'CURSOR'}
      />
      <IconButton
        name="Pan"
        Icon={<PanToolIcon />}
        onClick={() => {
          return uiStateStoreActions.setMode({
            type: 'PAN',
            showCursor: false
          });
        }}
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
      <IconButton
        name="Center"
        Icon={<CenterFocusStrongIcon />}
        onClick={fitDiagramToScreen}
        size={theme.customVars.toolMenu.height}
      />
    </Card>
  );
};
