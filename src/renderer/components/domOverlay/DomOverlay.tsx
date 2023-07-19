import React, { useMemo, useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSceneStore, Node } from 'src/stores/useSceneStore';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { getTileScreenPosition } from 'src/renderer/utils/gridHelpers';

const NodeContextMenu = (node: Node) => {
  const container = useRef<HTMLDivElement>();
  const scroll = useUiStateStore((state) => state.scroll);
  const zoom = useUiStateStore((state) => state.zoom);

  const { position: nodePosition } = node;
  const { position: scrollPosition } = scroll;

  useEffect(() => {
    if (!container.current) return;

    const screenPosition = getTileScreenPosition({
      position: nodePosition,
      scrollPosition,
      zoom
    });

    gsap.to(container.current, {
      duration: 0.1,
      left: screenPosition.x,
      top: screenPosition.y
    });
  }, [nodePosition, scrollPosition, zoom]);

  return (
    <Box
      ref={container}
      sx={{
        position: 'absolute',
        width: 100,
        height: 100,
        bgcolor: 'primary.main'
      }}
    >
      {node.id}
    </Box>
  );
};

export const DomOverlay = () => {
  const sceneItems = useSceneStore(({ nodes }) => ({ nodes }));
  const selectedItems = useMemo(
    () => sceneItems.nodes.filter((node) => node.isSelected),
    [sceneItems]
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
      {selectedItems.map((node) => (
        <NodeContextMenu key={node.id} {...node} />
      ))}
    </Box>
  );
};
