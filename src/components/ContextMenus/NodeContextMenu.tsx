import React from "react";
import { observer } from "mobx-react";
import { useGlobalState } from "../../hooks/useGlobalState";
import { ContextMenu } from "./ContextMenu";
import { ContextMenuItem } from "./ContextMenuItem";
import { Node } from "../../renderer/elements/Node";
import { ArrowRightAlt, Delete } from "@mui/icons-material";

interface Props {
  node: Node;
}

export const NodeContextMenu = ({ node }: Props) => {
  const renderer = useGlobalState((state) => state.renderer);
  const position = renderer.getTileScreenPosition(
    node.position.x,
    node.position.y
  );

  return (
    <ContextMenu position={position}>
      <ContextMenuItem
        onClick={() => {}}
        icon={<ArrowRightAlt />}
        label="Connect"
      />
      <ContextMenuItem
        onClick={node.destroy}
        icon={<Delete />}
        label="Remove"
      />
    </ContextMenu>
  );
};
