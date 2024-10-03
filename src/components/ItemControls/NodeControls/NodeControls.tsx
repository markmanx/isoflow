import React, { useState, useCallback } from 'react';
import { Box, Stack, Button } from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';
import { useIconCategories } from 'src/hooks/useIconCategories';
import { useIcon } from 'src/hooks/useIcon';
import { useScene } from 'src/hooks/useScene';
import { useViewItem } from 'src/hooks/useViewItem';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useModelItem } from 'src/hooks/useModelItem';
import { ControlsContainer } from '../components/ControlsContainer';
import { Icons } from '../IconSelectionControls/Icons';
import { NodeSettings } from './NodeSettings/NodeSettings';
import { Section } from '../components/Section';

interface Props {
  id: string;
}

const ModeOptions = {
  SETTINGS: 'SETTINGS',
  CHANGE_ICON: 'CHANGE_ICON'
} as const;

type Mode = keyof typeof ModeOptions;

export const NodeControls = ({ id }: Props) => {
  const [mode, setMode] = useState<Mode>('SETTINGS');
  const { updateModelItem, updateViewItem, deleteViewItem, duplicateViewItem } = useScene();
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const viewItem = useViewItem(id);
  const modelItem = useModelItem(id);
  const { iconCategories } = useIconCategories();
  const { icon } = useIcon(modelItem.icon);

  const onSwitchMode = useCallback((newMode: Mode) => {
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
            <Box
              component="img"
              src={icon.url}
              sx={{ width: 70, height: 70 }}
            />
            {mode === 'SETTINGS' && (
              <Button
                endIcon={<ChevronRightIcon />}
                onClick={() => {
                  onSwitchMode('CHANGE_ICON');
                }}
                variant="text"
              >
                Update icon
              </Button>
            )}
            {mode === 'CHANGE_ICON' && (
              <Button
                startIcon={<ChevronLeftIcon />}
                onClick={() => {
                  onSwitchMode('SETTINGS');
                }}
                variant="text"
              >
                Settings
              </Button>
            )}
          </Stack>
        </Section>
      </Box>
      {mode === 'SETTINGS' && (
        <NodeSettings
          key={viewItem.id}
          node={viewItem}
          onModelItemUpdated={(updates) => {
            updateModelItem(viewItem.id, updates);
          }}
          onViewItemUpdated={(updates) => {
            updateViewItem(viewItem.id, updates);
          }}
          onDeleted={() => {
            uiStateActions.setItemControls(null);
            deleteViewItem(viewItem.id);
          }}
          onDuplicated={() => {
            duplicateViewItem(viewItem);
          }}
        />
      )}
      {mode === 'CHANGE_ICON' && (
        <Icons
          key={viewItem.id}
          iconCategories={iconCategories}
          onClick={(_icon) => {
            updateModelItem(viewItem.id, { icon: _icon.id });
          }}
        />
      )}
    </ControlsContainer>
  );
};
