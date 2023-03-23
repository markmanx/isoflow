import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import Box from "@mui/material/Box";
import { SideNav } from "./components/SideNav";
import { Sidebar } from "./components/Sidebars";
import { ToolMenu } from "./components/ToolMenu";
import { RendererContainer } from "./components/RendererContainer";
import { SceneI } from "./validation/SceneSchema";
import { ModeManagerProvider } from "./contexts/ModeManagerContext";

interface Props {
  initialScene: SceneI;
}

const App = ({ initialScene }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <ModeManagerProvider>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <RendererContainer key="renderer" />
          <Sidebar />
          <SideNav />
          <ToolMenu />
        </Box>
      </ModeManagerProvider>
    </ThemeProvider>
  );
};

type Scene = SceneI;
export { Scene };
export default App;
