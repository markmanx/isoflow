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
import { Connector } from 'src/components/Connector/Connector';
import { DebugUtils } from 'src/components/DebugUtils/DebugUtils';
import { useResizeObserver } from 'src/hooks/useResizeObserver';

export const Renderer = () => {
  const [isDebugModeOn] = useState(false);
  const containerRef = useRef<HTMLDivElement>();
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });
  const scene = useSceneStore(({ connectors, groups }) => {
    return { connectors, groups };
  });
  const interactionsEnabled = useUiStateStore((state) => {
    return state.interactionsEnabled;
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
  const {
    setElement: setInteractionsElement,
    setIsEnabled: setInteractionsEnabled
  } = useInteractionManager();
  const { observe, disconnect, size: rendererSize } = useResizeObserver();

  const getNodesFromIds = useCallback(
    (nodeIds: string[]) => {
      return nodeIds
        .map((nodeId) => {
          return nodes.find((node) => {
            return node.id === nodeId;
          });
        })
        .filter((node) => {
          return node !== undefined;
        }) as NodeI[];
    },
    [nodes]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    observe(containerRef.current);
    setInteractionsElement(containerRef.current);

    return () => {
      disconnect();
    };
  }, [setInteractionsElement, observe, disconnect]);

  useEffect(() => {
    setInteractionsEnabled(interactionsEnabled);
  }, [interactionsEnabled, setInteractionsEnabled]);

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
        const groupNodes = getNodesFromIds(group.nodeIds);

        return <Group key={group.id} group={group} nodes={groupNodes} />;
      })}
      {mode.showCursor && <Cursor tile={mouse.position.tile} />}
      {scene.connectors.map((connector) => {
        const connectorNodes = getNodesFromIds([connector.from, connector.to]);

        return (
          <Connector
            key={connector.id}
            connector={connector}
            fromNode={connectorNodes[0]}
            toNode={connectorNodes[1]}
          />
        );
      })}
      {nodes.map((node) => {
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
