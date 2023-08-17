import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { Grid } from 'src/components/Grid/Grid';
import { Cursor } from 'src/components/Cursor/Cursor';
import { Nodes } from 'src/components/Nodes/Nodes';
import { Groups } from 'src/components/Groups/Groups';
import { Connectors } from 'src/components/Connectors/Connectors';
import { DebugUtils } from 'src/components/DebugUtils/DebugUtils';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { SceneLayer } from 'src/components/SceneLayer/SceneLayer';

export const Renderer = () => {
  const containerRef = useRef<HTMLDivElement>();
  const debugMode = useUiStateStore((state) => {
    return state.debugMode;
  });
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const { setElement: setInteractionsElement } = useInteractionManager();
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
    uiStateActions.setRendererSize(rendererSize);
  }, [rendererSize, uiStateActions]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <SceneLayer>
        <Grid />
      </SceneLayer>
      {mode.showCursor && (
        <SceneLayer>
          <Cursor />
        </SceneLayer>
      )}
      <SceneLayer>
        <Groups />
      </SceneLayer>
      <SceneLayer>
        <Connectors />
      </SceneLayer>
      <SceneLayer>
        <Nodes />
      </SceneLayer>
      {debugMode && (
        <SceneLayer>
          <DebugUtils />
        </SceneLayer>
      )}
      {/* Interaction layer */}
      <SceneLayer ref={containerRef} />
    </Box>
  );
};
