import React, { useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { IconSelection } from 'src/components/ItemControls/IconSelection/IconSelection';
import { UiElement } from 'components/UiElement/UiElement';
import { NodeControls } from './NodeControls/NodeControls';
import { ConnectorControls } from './ConnectorControls/ConnectorControls';
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
      case 'RECTANGLE':
        return <RectangleControls key={itemControls.id} id={itemControls.id} />;
      case 'ADD_ITEM':
        return <IconSelection />;
      default:
        return null;
    }
  }, [itemControls]);

  return (
    <UiElement
      sx={{
        top: theme.customVars.appPadding.y * 3
      }}
    >
      <Box
        sx={{
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          width: '345px',
          maxHeight: `calc(100% - ${theme.customVars.appPadding.y * 2}px)`
        }}
      >
        {Controls}
      </Box>
    </UiElement>
  );
};
