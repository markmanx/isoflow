import React from 'react';
import { Box } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { NodeContextMenu } from 'src/components/ContextMenu/NodeContextMenu';
import { EmptyTileContextMenu } from 'src/components/ContextMenu/EmptyTileContextMenu';

export const ContextMenuLayer = () => {
  const contextMenu = useUiStateStore((state) => {
    return state.contextMenu;
  });

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }}
    >
      {contextMenu?.type === 'NODE' && (
        <NodeContextMenu key={contextMenu.id} nodeId={contextMenu.id} />
      )}
      {contextMenu?.type === 'EMPTY_TILE' && (
        <EmptyTileContextMenu
          key={contextMenu.position.toString()}
          onAddNode={() => {}}
          position={contextMenu.position}
        />
      )}
    </Box>
  );
};
