import React from 'react';
import {
  PanToolOutlined as PanToolIcon,
  ZoomInOutlined as ZoomInIcon,
  ZoomOutOutlined as ZoomOutIcon,
  NearMeOutlined as NearMeIcon,
  AddOutlined as AddIcon,
  EastOutlined as ConnectorIcon,
  CropSquareOutlined as CropSquareIcon
} from '@mui/icons-material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { MAX_ZOOM, MIN_ZOOM } from 'src/config';
import { IconButton } from 'src/components/IconButton/IconButton';
import { UiElement } from 'src/components/UiElement/UiElement';

export const ToolMenu = () => {
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const uiStateStoreActions = useUiStateStore((state) => {
    return state.actions;
  });

  return (
    <UiElement orientation="TOPRIGHT">
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
        isActive={mode.type === 'PAN'}
      />
      <IconButton
        name="Zoom in"
        Icon={<ZoomInIcon />}
        onClick={uiStateStoreActions.incrementZoom}
        disabled={zoom === MAX_ZOOM}
      />
      <IconButton
        name="Zoom out"
        Icon={<ZoomOutIcon />}
        onClick={uiStateStoreActions.decrementZoom}
        disabled={zoom === MIN_ZOOM}
      />
    </UiElement>
  );
};
