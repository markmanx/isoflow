import { useContext } from "react";
import { useTheme } from "@mui/material";
import { useActor } from "@xstate/react";
import Card from "@mui/material/Card";
import { MenuItem } from "../MenuItem";
import PanToolIcon from "@mui/icons-material/PanTool";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import NearMeIcon from "@mui/icons-material/NearMe";
import { GlobalStateContext } from "../../contexts/GlobalStateContext";
import { useZoom } from "../../hooks/useZoom";

export const ToolMenu = () => {
  const theme = useTheme();
  const { editor } = useContext(GlobalStateContext);
  const [state] = useActor(editor);
  const { incrementZoom, decrementZoom } = useZoom();

  return (
    <Card
      sx={{
        position: "absolute",
        top: theme.spacing(4),
        right: theme.spacing(4),
        height: theme.customVars.toolMenu.height,
        borderRadius: 2,
      }}
    >
      <MenuItem
        name="Select"
        Icon={NearMeIcon}
        onClick={() => editor.send("SWITCH_TO_SELECT")}
        size={theme.customVars.toolMenu.height}
        isActive={state.matches("SELECT_MODE")}
      />
      <MenuItem
        name="Pan"
        Icon={PanToolIcon}
        onClick={() => editor.send("SWITCH_TO_PAN")}
        size={theme.customVars.toolMenu.height}
        isActive={state.matches("PAN_MODE")}
      />
      <MenuItem
        name="Zoom in"
        Icon={ZoomInIcon}
        onClick={incrementZoom}
        size={theme.customVars.toolMenu.height}
      />
      <MenuItem
        name="Zoom out"
        Icon={ZoomOutIcon}
        onClick={decrementZoom}
        size={theme.customVars.toolMenu.height}
      />
    </Card>
  );
};
