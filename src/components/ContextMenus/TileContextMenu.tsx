import React from "react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { ContextMenu } from "./ContextMenu";
import { ContextMenuItem } from "./ContextMenuItem";
import { Coords } from "../../renderer/elements/Coords";
import { Add } from "@mui/icons-material";

interface Props {
  tile: Coords;
}

export const TileContextMenu = ({ tile }: Props) => {
  const renderer = useGlobalState((state) => state.renderer);
  const icons = useGlobalState((state) => state.initialScene.icons);
  const position = renderer.getTileScreenPosition(tile);

  return (
    <ContextMenu position={position}>
      <ContextMenuItem
        onClick={() =>
          renderer.sceneElements.nodes.addNode({
            position: tile,
            iconId: icons[0].id,
          })
        }
        icon={<Add />}
        label="Add node"
      />
    </ContextMenu>
  );
};
