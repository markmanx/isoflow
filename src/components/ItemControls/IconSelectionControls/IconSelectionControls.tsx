import React, { useCallback } from 'react';
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

  return (
    <ControlsContainer
      header={
        <Section sx={{ position: 'sticky', top: 0, pt: 6, pb: 3 }}>
          <Searchbox value={filter} onChange={setFilter} />
        </Section>
      }
    >
      {filteredIcons && (
        <Section>
          <IconGrid icons={filteredIcons} onMouseDown={onMouseDown} />
        </Section>
      )}
      {!filteredIcons && (
        <Icons iconCategories={iconCategories} onMouseDown={onMouseDown} />
      )}
    </ControlsContainer>
  );
};
