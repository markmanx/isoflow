import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { SideNav } from "./components/SideNav";
import { Sidebar } from "./components/Sidebars";
import { ToolMenu } from "./components/ToolMenu";
import { RendererContainer } from "./components/RendererContainer";
import { SceneI } from "./validation/SceneSchema";
import { GlobalStateProvider } from "./contexts/GlobalStateContext";

interface Props {
  initialScene: SceneI;
}

export const App = ({ initialScene }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <RendererContainer key="renderer" />
        <Sidebar />
        <SideNav />
        <ToolMenu />
      </GlobalStateProvider>
    </ThemeProvider>
  );
};
