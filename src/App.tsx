import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { theme } from "./theme";
import { SideNav } from "./components/SideNav";
import { Sidebar } from "./components/Sidebars";
import { ToolMenu } from "./components/ToolMenu";
import { RendererContainer } from "./components/RendererContainer";
import { SceneI } from "./validation/SceneSchema";
import { ModeManagerProvider } from "./contexts/ModeManagerContext";
import { useGlobalState } from "./hooks/useGlobalState";

interface Props {
  initialScene: SceneI;
  width?: number | string;
  height: number | string;
}

const App = ({ initialScene, width, height }: Props) => {
  const setInitialScene = useGlobalState((state) => state.setInitialScene);

  useEffect(() => {
    setInitialScene(initialScene);
  }, [initialScene]);

  return (
    <ThemeProvider theme={theme}>
      <ModeManagerProvider>
        <Box
          sx={{
            width: width ?? "100%",
            height,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <RendererContainer />
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
