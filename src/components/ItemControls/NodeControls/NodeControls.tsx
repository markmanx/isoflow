import React, { useState, useCallback } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Node } from 'src/types';
import { useSceneStore } from 'src/stores/sceneStore';
import { useNode } from 'src/hooks/useNode';
import { ControlsContainer } from '../components/ControlsContainer';
import { Icons } from '../IconSelection/Icons';
import { Header } from '../components/Header';
import { NodeSettings } from './NodeSettings/NodeSettings';

interface Props {
  nodeId: string;
}

export const NodeControls = ({ nodeId }: Props) => {
  const [tab, setTab] = useState(0);
  const icons = useSceneStore((state) => {
    return state.icons;
  });
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const node = useNode(nodeId);

  const onTabChanged = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onNodeUpdated = useCallback(
    (updates: Partial<Node>) => {
      sceneActions.updateNode(nodeId, updates);
    },
    [sceneActions, nodeId]
  );

  if (!node) return null;

  return (
    <ControlsContainer
      header={
        <Box>
          <Header title="Node settings" />
          <Tabs sx={{ px: 2 }} value={tab} onChange={onTabChanged}>
            <Tab label="Settings" />
            <Tab label="Icons" />
          </Tabs>
        </Box>
      }
    >
      {tab === 0 && (
        <NodeSettings
          key={node.id}
          color={node.color}
          label={node.label}
          labelHeight={node.labelHeight}
          onUpdate={onNodeUpdated}
        />
      )}
      {tab === 1 && (
        <Icons
          key={node.id}
          icons={icons}
          onClick={(icon) => {
            onNodeUpdated({ iconId: icon.id });
          }}
        />
      )}
    </ControlsContainer>
  );
};
