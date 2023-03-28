import { observer } from "mobx-react";
import React, { useEffect, useMemo } from "react";
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
import { OnSceneChange } from "./renderer/types";

interface Props {
  initialScene: SceneI;
  onSceneChange: OnSceneChange;
  width?: number | string;
  height: number | string;
}

const InnerApp = React.memo(
  ({ height, width }: Pick<Props, "height" | "width">) => {
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
  }
);

const App = observer(
  ({ initialScene, width, height, onSceneChange }: Props) => {
    const setInitialScene = useGlobalState((state) => state.setInitialScene);
    const setOnSceneChange = useGlobalState((state) => state.setOnSceneChange);

    useEffect(() => {
      setOnSceneChange(onSceneChange);
    }, [setOnSceneChange, onSceneChange]);

    useEffect(() => {
      setInitialScene(initialScene);
    }, [initialScene, setInitialScene]);

    return <InnerApp height={height} width={width} />;
  }
);

type Scene = SceneI;
export { Scene, OnSceneChange };
export default App;
