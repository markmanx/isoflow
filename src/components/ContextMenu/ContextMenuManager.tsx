import React, { useCallback } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { getTilePosition } from 'src/utils';
import { useScene } from 'src/hooks/useScene';
import { ContextMenu } from './ContextMenu';

interface Props {
  anchorEl?: HTMLElement;
}

export const ContextMenuManager = ({ anchorEl }: Props) => {
  const scene = useScene();
  const contextMenu = useUiStateStore((state) => {
    return state.contextMenu;
  });

  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const onClose = useCallback(() => {
    uiStateActions.setContextMenu(null);
  }, [uiStateActions]);

  if (!contextMenu) {
    return null;
  }

  return (
    <ContextMenu
      anchorEl={anchorEl}
      onClose={onClose}
      position={getTilePosition({ tile: contextMenu.tile })}
      menuItems={[
        {
          label: 'Send backward',
          onClick: () => {
            scene.changeLayerOrder('SEND_BACKWARD', contextMenu.item);
            onClose();
          }
        },
        {
          label: 'Bring forward',
          onClick: () => {
            scene.changeLayerOrder('BRING_FORWARD', contextMenu.item);
            onClose();
          }
        },
        {
          label: 'Send to back',
          onClick: () => {
            scene.changeLayerOrder('SEND_TO_BACK', contextMenu.item);
            onClose();
          }
        },
        {
          label: 'Bring to front',
          onClick: () => {
            scene.changeLayerOrder('BRING_TO_FRONT', contextMenu.item);
            onClose();
          }
        }
      ]}
    />
  );
};
