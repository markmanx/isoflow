import React, { useMemo, useCallback } from 'react';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { NodeControls } from './NodeControls/NodeControls';
import { ProjectControls } from './ProjectControls/ProjectControls';

export const ItemControlsManager = () => {
  const theme = useTheme();
  const itemControls = useUiStateStore((state) => state.itemControls);
  const uiStateActions = useUiStateStore((state) => state.actions);

  const onClose = useCallback(() => {
    uiStateActions.setSidebar(null);
  }, [uiStateActions]);

  const Controls = useMemo(() => {
    switch (itemControls?.type) {
      case 'SINGLE_NODE':
        return <NodeControls onClose={onClose} />;
      case 'PROJECT_SETTINGS':
        return <ProjectControls onClose={onClose} />;
      default:
        return null;
    }
  }, [itemControls, onClose]);

  return (
    <Slide
      direction="right"
      in={itemControls !== null}
      mountOnEnter
      unmountOnExit
    >
      <Card
        sx={{
          position: 'absolute',
          width: '400px',
          height: '100%',
          top: 0,
          left: theme.customVars.appPadding.x,
          borderRadius: 0
        }}
      >
        {Controls}
      </Card>
    </Slide>
  );
};
