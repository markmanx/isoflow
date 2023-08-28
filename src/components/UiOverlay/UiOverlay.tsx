import React from 'react';
import { SceneLayer } from 'src/components/SceneLayer/SceneLayer';
import { DragAndDrop } from 'src/components/DragAndDrop/DragAndDrop';
import { ItemControlsManager } from 'src/components/ItemControls/ItemControlsManager';
import { ToolMenu } from 'src/components/ToolMenu/ToolMenu';
import { useUiStateStore } from 'src/stores/uiStateStore';

export const UiOverlay = () => {
  const disableInteractions = useUiStateStore((state) => {
    return state.disableInteractions;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
  });

  if (disableInteractions) return null;

  return (
    <>
      <ItemControlsManager />
      <ToolMenu />
      {mode.type === 'PLACE_ELEMENT' && mode.icon && (
        <SceneLayer>
          <DragAndDrop icon={mode.icon} tile={mouse.position.tile} />
        </SceneLayer>
      )}
    </>
  );
};
