import React, { useMemo } from 'react';
import { useTheme } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { IconSelection } from 'src/components/ItemControls/IconSelection/IconSelection';
import { UiElement } from 'components/UiElement/UiElement';
import { NodeControls } from './NodeControls/NodeControls';
import { ConnectorControls } from './ConnectorControls/ConnectorControls';
import { TextBoxControls } from './TextBoxControls/TextBoxControls';
import { RectangleControls } from './RectangleControls/RectangleControls';

export const ItemControlsManager = () => {
  const itemControls = useUiStateStore((state) => {
    return state.itemControls;
  });
  const theme = useTheme();

  const Controls = useMemo(() => {
    switch (itemControls?.type) {
      case 'NODE':
        return <NodeControls key={itemControls.id} id={itemControls.id} />;
      case 'CONNECTOR':
        return <ConnectorControls key={itemControls.id} id={itemControls.id} />;
      case 'TEXTBOX':
        return <TextBoxControls key={itemControls.id} id={itemControls.id} />;
      case 'RECTANGLE':
        return <RectangleControls key={itemControls.id} id={itemControls.id} />;
      case 'ADD_ITEM':
        return <IconSelection />;
      default:
        return null;
    }
  }, [itemControls]);

  const topOffset = useMemo(() => {
    return theme.customVars.appPadding.y * 2 + parseInt(theme.spacing(2), 10);
  }, [theme]);

  return (
    <UiElement
      sx={{
        top: topOffset,
        maxHeight: `calc(100% - ${
          topOffset + theme.customVars.appPadding.y
        }px)`,
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        width: '345px'
      }}
    >
      {Controls}
    </UiElement>
  );
};
