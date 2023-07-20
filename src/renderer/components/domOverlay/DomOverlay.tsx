import React from 'react';
import { Box } from '@mui/material';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { NodeContextMenu } from 'src/components/ContextMenu/NodeContextMenu';
import { EmptyTileContextMenu } from 'src/components/ContextMenu/EmptyTileContextMenu';
import { useSceneStore } from 'src/stores/useSceneStore';

export const DomOverlay = () => {
  const contextMenu = useUiStateStore((state) => state.contextMenu);
  const sceneActions = useSceneStore((state) => state.actions);

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
          onAddNode={() => sceneActions.createNode(contextMenu.position)}
          position={contextMenu.position}
        />
      )}
    </Box>
  );
};
