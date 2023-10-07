import React, { useState, useCallback, useMemo } from 'react';
import { Box, Stack, Button } from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import { Node } from 'src/types';
import { useSceneStore } from 'src/stores/sceneStore';
import { useNode } from 'src/hooks/useNode';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useIconCategories } from 'src/hooks/useIconCategories';
import { getItemById } from 'src/utils';
import { ControlsContainer } from '../components/ControlsContainer';
import { Icons } from '../IconSelectionControls/Icons';
import { NodeSettings } from './NodeSettings/NodeSettings';
import { Section } from '../components/Section';

interface Props {
  id: string;
}

const ModeEnum = {
  Settings: 'Settings',
  ChangeIcon: 'ChangeIcon'
} as const;

export const NodeControls = ({ id }: Props) => {
  const [mode, setMode] = useState<keyof typeof ModeEnum>('Settings');
  const { iconCategories } = useIconCategories();
  const icons = useSceneStore((state) => {
    return state.icons;
  });
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const node = useNode(id);

  const iconUrl = useMemo(() => {
    const { item: icon } = getItemById(icons, node.icon);

    return icon.url;
  }, [node.icon, icons]);

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

  const onSwitchMode = useCallback((newMode: keyof typeof ModeEnum) => {
    setMode(newMode);
  }, []);

  return (
    <ControlsContainer>
      <Box
        sx={{
          bgcolor: (theme) => {
            return theme.customVars.customPalette.diagramBg;
          }
        }}
      >
        <Section sx={{ py: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Box component="img" src={iconUrl} sx={{ width: 70, height: 70 }} />
            {mode === 'Settings' && (
              <Button
                endIcon={<ChevronRightIcon />}
                onClick={() => {
                  onSwitchMode('ChangeIcon');
                }}
                variant="text"
              >
                Update icon
              </Button>
            )}
            {mode === 'ChangeIcon' && (
              <Button
                startIcon={<ChevronLeftIcon />}
                onClick={() => {
                  onSwitchMode('Settings');
                }}
                variant="text"
              >
                Settings
              </Button>
            )}
          </Stack>
        </Section>
      </Box>
      {mode === ModeEnum.Settings && (
        <NodeSettings
          key={node.id}
          node={node}
          onUpdate={onNodeUpdated}
          onDelete={onNodeDeleted}
        />
      )}
      {mode === ModeEnum.ChangeIcon && (
        <Icons
          key={node.id}
          iconCategories={iconCategories}
          onClick={(icon) => {
            onNodeUpdated({ icon: icon.id });
          }}
        />
      )}
    </ControlsContainer>
  );
};
