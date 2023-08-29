import React from 'react';
import {
  PanToolOutlined as PanToolIcon,
  ZoomInOutlined as ZoomInIcon,
  ZoomOutOutlined as ZoomOutIcon,
  NearMeOutlined as NearMeIcon,
  AddOutlined as AddIcon,
  EastOutlined as ConnectorIcon,
  CropSquareOutlined as CropSquareIcon,
  Title as TitleIcon
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
        name="Select"
        Icon={<NearMeIcon />}
        onClick={() => {
          uiStateStoreActions.setMode({
            type: 'CURSOR',
            showCursor: true,
            mousedownItem: null
          });
        }}
        isActive={mode.type === 'CURSOR' || mode.type === 'DRAG_ITEMS'}
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
        isActive={mode.type === 'PLACE_ELEMENT'}
      />
      <IconButton
        name="Rectangle"
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
        name="Text"
        Icon={<TitleIcon />}
        onClick={() => {
          uiStateStoreActions.setMode({
            type: 'TEXTBOX',
            showCursor: false
          });
        }}
        isActive={mode.type === 'TEXTBOX'}
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
