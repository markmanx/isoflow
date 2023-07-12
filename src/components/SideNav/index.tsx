import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { MenuItem } from "../MenuItem";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { useGlobalState } from "../../hooks/useGlobalState";

const menuItems = [
  { type: "SINGLE_NODE", name: "Icons", Icon: AddIcon },
  { type: "PROJECT_SETTINGS", name: "Project settings", Icon: SettingsIcon },
];

export const SideNav = () => {
  const theme = useTheme();
  // const sidebarState = useGlobalState((state) => state.sidebarState);
  // const setSidebarState = useGlobalState((state) => state.setSidebarState);

  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        top: 0,
        width: theme.customVars.sideNav,
        height: "100vh",
        bgcolor: "grey.900",
      }}
    >
      {/* {menuItems.map((item, index) => (
        <MenuItem
          key={item.name}
          isActive={item.type === sidebarState?.type}
          onClick={() => setSidebarState(index)}
          size={theme.customVars.sideNav.width}
          tooltipPosition="right"
          {...item}
        />
      ))} */}
    </Box>
  );
};
