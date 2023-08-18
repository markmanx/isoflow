import React from 'react';
import { Card, useTheme } from '@mui/material';
import {
  PanToolOutlined as PanToolIcon,
  ZoomInOutlined as ZoomInIcon,
  ZoomOutOutlined as ZoomOutIcon,
  NearMeOutlined as NearMeIcon,
  CenterFocusStrongOutlined as CenterFocusStrongIcon,
  AddOutlined as AddIcon,
  EastOutlined as ConnectorIcon,
  CropSquareOutlined as CropSquareIcon
} from '@mui/icons-material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useDiagramUtils } from 'src/hooks/useDiagramUtils';
import { MAX_ZOOM, MIN_ZOOM } from 'src/config';
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
  const { fitProjectToScreen } = useDiagramUtils();

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
        name="Add element"
        Icon={<AddIcon />}
        onClick={() => {
          uiStateStoreActions.setItemControls({
            type: 'ADD_ITEM'
          });
          uiStateStoreActions.setMode({
            type: 'PLACE_ELEMENT',
            showCursor: true,
            icon: null
          });
        }}
        size={theme.customVars.toolMenu.height}
      />
      <IconButton
        name="Area"
        Icon={<CropSquareIcon />}
        onClick={() => {
          uiStateStoreActions.setMode({
            type: 'RECTANGLE.DRAW',
            showCursor: true,
            area: null
          });
        }}
        isActive={mode.type === 'RECTANGLE.DRAW'}
        size={theme.customVars.toolMenu.height}
      />
      <IconButton
        name="Connector"
        Icon={<ConnectorIcon />}
        onClick={() => {
          uiStateStoreActions.setMode({
            type: 'CONNECTOR',
            connector: null,
            showCursor: true
          });
        }}
        isActive={mode.type === 'CONNECTOR'}
        size={theme.customVars.toolMenu.height}
      />
      <IconButton
        name="Select"
        Icon={<NearMeIcon />}
        onClick={() => {
          uiStateStoreActions.setMode({
            type: 'CURSOR',
            showCursor: true,
            mousedownItem: null
          });
        }}
        size={theme.customVars.toolMenu.height}
        isActive={mode.type === 'CURSOR'}
      />
      <IconButton
        name="Pan"
        Icon={<PanToolIcon />}
        onClick={() => {
          uiStateStoreActions.setMode({
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
        onClick={fitProjectToScreen}
        size={theme.customVars.toolMenu.height}
      />
    </Card>
  );
};
