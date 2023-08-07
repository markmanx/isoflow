import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { Node as NodeI } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useSceneStore } from 'src/stores/sceneStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { Grid } from 'src/components/Grid/Grid';
import { Cursor } from 'src/components/Cursor/Cursor';
import { Node } from 'src/components/Node/Node';
import { Group } from 'src/components/Group/Group';
// import { Connector } from 'src/components/Connector/Connector';
import { DebugUtils } from 'src/components/DebugUtils/DebugUtils';
import { useResizeObserver } from 'src/hooks/useResizeObserver';

export const Renderer = () => {
  const [isDebugModeOn] = useState(false);
  const containerRef = useRef<HTMLDivElement>();
  const scene = useSceneStore(({ nodes, connectors, groups }) => {
    return { nodes, connectors, groups };
  });
  const icons = useSceneStore((state) => {
    return state.icons;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const zoom = useUiStateStore((state) => {
    return state.zoom;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
  });
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const { setRendererSize } = useUiStateStore((state) => {
    return state.actions;
  });
  const { setElement } = useInteractionManager();
  const { observe, disconnect, size: rendererSize } = useResizeObserver();

  const getNodesFromIds = useCallback(
    (nodeIds: string[]) => {
      return nodeIds
        .map((nodeId) => {
          return scene.nodes.find((node) => {
            return node.id === nodeId;
          });
        })
        .filter((node) => {
          return node !== undefined;
        }) as NodeI[];
    },
    [scene.nodes]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    observe(containerRef.current);
    setElement(containerRef.current);

    return () => {
      disconnect();
    };
  }, [setElement, observe, disconnect]);

  useEffect(() => {
    setRendererSize(rendererSize);
  }, [rendererSize, setRendererSize]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%'
      }}
    >
      <Grid scroll={scroll} zoom={zoom} />
      {scene.groups.map((group) => {
        const nodes = getNodesFromIds(group.nodeIds);

        return <Group key={group.id} group={group} nodes={nodes} />;
      })}
      {mode.showCursor && <Cursor tile={mouse.position.tile} />}
      {/* {scene.connectors.map((connector) => {
        const nodes = getNodesFromIds([connector.from, connector.to]);

        return (
          <Connector
            connector={connector}
            fromNode={nodes[0]}
            toNode={nodes[1]}
            scroll={scroll}
            zoom={zoom}
          />
        );
      })} */}
      {scene.nodes.map((node) => {
        return (
          <Node
            key={node.id}
            node={node}
            iconUrl={
              icons.find((icon) => {
                return icon.id === node.iconId;
              })?.url
            }
          />
        );
      })}
      {isDebugModeOn && (
        <Box sx={{ position: 'absolute' }}>
          <DebugUtils />
        </Box>
      )}
    </Box>
  );
};
