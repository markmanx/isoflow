import React from 'react';
import { Box } from '@mui/material';

export const DomOverlay = () => {
  const selectedItems = useUiStateStore((state) => state.selectedItems);
  const nodes = useSceneStore((state) => state.nodes);
  const selectedNodes = useMemo(
    () =>
      selectedItems.map((item) => {
        if (item.type === 'NODE') {
          const node = nodes.find((n) => n.id === item.id);

          if (!node) return null;

          return node;
        }
      }),
    [selectedItems, nodes]
  );

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
      {selectedNodes.map((node) => {
        if (!node) return;

        return <NodeContextMenu key={node.id} {...node} />;
      })}
    </Box>
  );
};
