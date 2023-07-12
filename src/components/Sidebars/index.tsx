import React, { useMemo, useCallback } from "react";
import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
import { NodeSidebar } from "./NodeSidebar";
import { ProjectSettings } from "./ProjectSettings";
import { useGlobalState } from "../../hooks/useGlobalState";

export const Sidebar = () => {
  const theme = useTheme();
  const sidebarState = useGlobalState((state) => state.sidebarState);
  const closeSidebar = useGlobalState((state) => state.closeSidebar);
  const closeContextMenu = useGlobalState((state) => state.closeContextMenu);

  const onClose = useCallback(() => {
    closeSidebar();
    closeContextMenu();
  }, [closeSidebar, closeContextMenu]);

  const Component = useMemo(() => {
    switch (sidebarState?.type) {
      case "SINGLE_NODE":
        return <NodeSidebar node={sidebarState.node} onClose={onClose} />;
      case "PROJECT_SETTINGS":
        return <ProjectSettings onClose={onClose} />;
      default:
        return null;
    }
  }, [sidebarState]);

  return (
    <Slide
      direction="right"
      in={sidebarState !== null}
      mountOnEnter
      unmountOnExit
    >
      <Card
        sx={{
          position: "absolute",
          width: "400px",
          height: "100%",
          top: 0,
          left: theme.customVars.sideNav.width,
          borderRadius: 0,
        }}
      >
        {Component}
      </Card>
    </Slide>
  );
};
