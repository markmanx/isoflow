import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { ControlsContainer } from 'src/components/ItemControls/components/ControlsContainer';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Icon } from 'src/types';
import { Section } from 'src/components/ItemControls/components/Section';
import { Searchbox } from 'src/components/ItemControls/IconSelectionControls/Searchbox';
import { useIconFiltering } from 'src/hooks/useIconFiltering';
import { Icons } from './Icons';

export const IconSelectionControls = () => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const { setFilter, filter, icons } = useIconFiltering();

  const onMouseDown = useCallback(
    (icon: Icon) => {
      if (mode.type !== 'PLACE_ELEMENT') return;

      uiStateActions.setMode({
        type: 'PLACE_ELEMENT',
        showCursor: true,
        icon
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
      <Box sx={{ py: 6 }}>
        <Icons icons={icons} onMouseDown={onMouseDown} />
      </Box>
    </ControlsContainer>
  );
};
