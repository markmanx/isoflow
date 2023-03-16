import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import { MenuItem } from "../MenuItem";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { useGlobalState } from "../../hooks/useGlobalState";

const menuItems = [
  { name: "Icons", Icon: AddIcon },
  { name: "Project settings", Icon: SettingsIcon },
];

export const SideNav = () => {
  const theme = useTheme();
  const selectedSideNavItem = useGlobalState(
    (state) => state.selectedSideNavItem
  );
  const setSelectedSideNavItem = useGlobalState(
    (state) => state.setSelectedSideNavItem
  );

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
      {menuItems.map((item, index) => (
        <MenuItem
          key={item.name}
          isActive={index === selectedSideNavItem}
          onClick={() => setSelectedSideNavItem(index)}
          size={theme.customVars.sideNav.width}
          tooltipPosition="right"
          {...item}
        />
      ))}
    </Box>
  );
};
