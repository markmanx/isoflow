import React, { useState, useCallback } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Node } from 'src/types';
import { useSceneStore } from 'src/stores/sceneStore';
import { useNode } from 'src/hooks/useNode';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useIconCategories } from 'src/hooks/useIconCategories';
import { ControlsContainer } from '../components/ControlsContainer';
import { Icons } from '../IconSelectionControls/Icons';
import { NodeSettings } from './NodeSettings/NodeSettings';

interface Props {
  id: string;
}

export const NodeControls = ({ id }: Props) => {
  const [tab, setTab] = useState(0);
  const { iconCategories } = useIconCategories();
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const node = useNode(id);

  const onTabChanged = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onNodeUpdated = useCallback(
    (updates: Partial<Node>) => {
      sceneActions.updateNode(id, updates);
    },
    [sceneActions, id]
  );

  const onNodeDeleted = useCallback(() => {
    uiStateActions.setItemControls(null);
    sceneActions.deleteNode(id);
  }, [sceneActions, id, uiStateActions]);

  return (
    <ControlsContainer
      header={
        <Box>
          <Tabs sx={{ px: 2 }} value={tab} onChange={onTabChanged}>
            <Tab label="Settings" />
            <Tab label="Change icon" />
          </Tabs>
        </Box>
      }
    >
      {tab === 0 && (
        <NodeSettings
          key={node.id}
          label={node.label}
          labelHeight={node.labelHeight}
          onUpdate={onNodeUpdated}
          onDelete={onNodeDeleted}
        />
      )}
      {tab === 1 && (
        <Icons
          key={node.id}
          iconCategories={iconCategories}
          onClick={(icon) => {
            onNodeUpdated({ iconId: icon.id });
          }}
        />
      )}
    </ControlsContainer>
  );
};
