import React, { useMemo, useCallback } from 'react';
import { useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import Slide from '@mui/material/Slide';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { NodeSidebar } from './NodeSidebar/NodeSidebar';
import { ProjectSettingsSidebar } from './ProjectSettingsSidebar/ProjectSettingsSidebar';

export const SidebarManager = () => {
  const theme = useTheme();
  const sidebar = useUiStateStore((state) => state.sidebar);
  const uiStateActions = useUiStateStore((state) => state.actions);

  const onClose = useCallback(() => {
    uiStateActions.setSidebar(null);
  }, [uiStateActions]);

  const Sidebar = useMemo(() => {
    switch (sidebar?.type) {
      case 'SINGLE_NODE':
        return <NodeSidebar onClose={onClose} />;
      case 'PROJECT_SETTINGS':
        return <ProjectSettingsSidebar onClose={onClose} />;
      default:
        return null;
    }
  }, [sidebar, onClose]);

  return (
    <Slide direction="right" in={sidebar !== null} mountOnEnter unmountOnExit>
      <Card
        sx={{
          position: 'absolute',
          width: '400px',
          height: '100%',
          top: 0,
          left: theme.customVars.sideNav.width,
          borderRadius: 0
        }}
      >
        {Sidebar}
      </Card>
    </Slide>
  );
};
