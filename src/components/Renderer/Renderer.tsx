import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
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
import { SceneLayer } from 'src/components/SceneLayer/SceneLayer';
import { IsoTileArea } from 'src/components/IsoTileArea/IsoTileArea';
import { DEFAULT_COLOR } from 'src/config';

export const Renderer = () => {
  const containerRef = useRef<HTMLDivElement>();
  const debugMode = useUiStateStore((state) => {
    return state.debugMode;
  });
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
      <SceneLayer>
        {scene.groups.map((group) => {
          return <Group key={group.id} {...group} />;
        })}
      </SceneLayer>
      <SceneLayer>
        {mode.showCursor && <Cursor tile={mouse.position.tile} />}
      </SceneLayer>
      <SceneLayer>
        {mode.type === 'AREA_TOOL' && mode.area && (
          <Group
            from={mode.area.from}
            to={mode.area.to}
            color={DEFAULT_COLOR}
          />
        )}
      </SceneLayer>
      <SceneLayer>
        {scene.connectors.map((connector) => {
          return <Connector key={connector.id} connector={connector} />;
        })}
      </SceneLayer>
      <SceneLayer>
        {nodes.map((node) => {
          return (
            <Node
              key={node.id}
              order={-node.position.x - node.position.y}
              node={node}
              icon={icons.find((icon) => {
                return icon.id === node.iconId;
              })}
            />
          );
        })}
      </SceneLayer>
      <SceneLayer>
        {mode.type === 'CONNECTOR' && mode.connector && (
          <Connector connector={mode.connector} />
        )}
      </SceneLayer>
      {debugMode && (
        <SceneLayer>
          <DebugUtils />
        </SceneLayer>
      )}
    </Box>
  );
};
