import React from "react";
import { useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Slide from "@mui/material/Slide";
import { Icons } from "./Icons";
import { Transition } from "./Transition";
import { ProjectSettings } from "./ProjectSettings";
import { useGlobalState } from "../../hooks/useGlobalState";

export const Sidebar = () => {
  const theme = useTheme();
  const { selectedSideNavItem, closeSideNav, icons } = useGlobalState(
    (state) => ({
      selectedSideNavItem: state.selectedSideNavItem,
      closeSideNav: state.closeSideNav,
      icons: state.icons,
    })
  );

  return (
    <Slide
      direction="right"
      in={selectedSideNavItem !== null}
      mountOnEnter
      unmountOnExit
    >
      <Card
        sx={{
          position: "absolute",
          width: "400px",
          height: "100vh",
          top: 0,
          left: theme.customVars.sideNav.width,
          borderRadius: 0,
        }}
      >
        <Transition isIn={selectedSideNavItem === 0}>
          <Icons icons={icons} onClose={closeSideNav} />
        </Transition>
        <Transition isIn={selectedSideNavItem === 1}>
          <ProjectSettings onClose={closeSideNav} />
        </Transition>
      </Card>
    </Slide>
  );
};
