import React, { useState, useCallback } from "react";
import { Sidebar } from "../../Sidebar";
import { Icons } from "./Icons";
import { Header } from "../../Sidebar/Header";
import { Node } from "../../../renderer/elements/Node";
import { Tabs, Tab, Box } from "@mui/material";
import { useGlobalState } from "../../../hooks/useGlobalState";
import { IconI } from "../../../validation/SceneSchema";
import { NodeSettings } from "./NodeSettings";

interface Props {
  node: Node;
  onClose: () => void;
}

export const NodeSidebar = ({ node, onClose }: Props) => {
  const [tab, setTab] = useState(0);
  const icons = useGlobalState((state) => state.initialScene.icons);

  const onTabChanged = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onIconChanged = useCallback(
    (icon: IconI) => {
      node.update({ iconId: icon.id });
    },
    [node]
  );

  return (
    <Sidebar
      header={
        <Box>
          <Header title="Node" onClose={onClose} />{" "}
          <Tabs value={tab} onChange={onTabChanged}>
            <Tab label="Settings" />
            <Tab label="Icons" />
          </Tabs>
        </Box>
      }
    >
      {tab === 0 && <NodeSettings node={node} />}
      {tab === 1 && <Icons icons={icons} onClick={onIconChanged} />}
    </Sidebar>
  );
};
