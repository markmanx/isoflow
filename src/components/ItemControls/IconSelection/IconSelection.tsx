import React, { useCallback } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { ControlsContainer } from 'src/components/ItemControls/components/ControlsContainer';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Icon } from 'src/types';
import { Icons } from './Icons';

export const IconSelection = () => {
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const icons = useSceneStore((state) => {
    return state.icons;
  });

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
    <ControlsContainer>
      <Icons icons={icons} onMouseDown={onMouseDown} />
    </ControlsContainer>
  );
};
