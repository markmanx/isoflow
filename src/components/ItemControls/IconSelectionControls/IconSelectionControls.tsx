import React, { useCallback } from 'react';
import { Stack, Alert } from '@mui/material';
import { ControlsContainer } from 'src/components/ItemControls/components/ControlsContainer';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Icon } from 'src/types';
import { Section } from 'src/components/ItemControls/components/Section';
import { Searchbox } from 'src/components/ItemControls/IconSelectionControls/Searchbox';
import { useIconFiltering } from 'src/hooks/useIconFiltering';
import { useIconCategories } from 'src/hooks/useIconCategories';
import { Icons } from './Icons';
import { IconGrid } from './IconGrid';

export const IconSelectionControls = () => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const hiddenIcons = useUiStateStore((state) => {
    return state.hiddenIcons;
  });
  const { setFilter, filteredIcons, filter } = useIconFiltering();
  const { iconCategories } = useIconCategories();

  const onMouseDown = useCallback(
    (icon: Icon) => {
      if (mode.type !== 'PLACE_ICON') return;

      uiStateActions.setMode({
        type: 'PLACE_ICON',
        showCursor: true,
        id: icon.id
      });
    },
    [mode, uiStateActions]
  );

  const hideIcons = useCallback(
    (icons: Icon[], hidden: string[]) => {
      return icons.filter((icon) => !hidden.includes(icon.id));
    },
    []
  );

  const hideIconsInCategories = useCallback(
    (categories: typeof iconCategories, hidden: string[]) => {
      return categories.map((category) => {
        return {
          ...category,
          icons: hideIcons(category.icons, hidden)
        };
      }).filter((category) => category.icons.length > 0);
    },
    [hideIcons]
  );

  return (
    <ControlsContainer
      header={
        <Section sx={{ position: 'sticky', top: 0, pt: 6, pb: 3 }}>
          <Stack spacing={2}>
            <Searchbox value={filter} onChange={setFilter} />
            <Alert severity="info">
              You can drag and drop any item below onto the workspace.
            </Alert>
          </Stack>
        </Section>
      }
    >
      {filteredIcons && (
        <Section>
          <IconGrid icons={hideIcons(filteredIcons, hiddenIcons)} onMouseDown={onMouseDown} />
        </Section>
      )}
      {!filteredIcons && (
        <Icons iconCategories={hideIconsInCategories(iconCategories, hiddenIcons)} onMouseDown={onMouseDown} />
      )}
    </ControlsContainer>
  );
};
