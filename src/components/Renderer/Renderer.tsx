import React, { useRef, useEffect, useState, useMemo } from 'react';
import Paper from 'paper';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useRenderer } from './useRenderer';
import { Node } from './Node';
import {
  getTileFromMouse,
  getTilePosition,
  getTileScreenPosition
} from './utils/gridHelpers';
import { useInteractionManager } from './interactionManager/useInteractionManager';
import { Coords } from '../../utils/Coords';
import {
  useZoom,
  useScrollPosition,
  useGridSize,
  useScene,
  useMode,
  useMouse,
  useUiState,
  useSceneStore,
  useSceneActions,
  useUiStateStore
} from '../../stores';
import { NodeSchemaI } from '../../validation/SceneSchema';

export const Renderer = () => {
  const renderer = useRenderer();
  const scene = useScene();
  const mode = useMode();
  const zoom = useZoom();
  const mouse = useMouse();
  const gridSize = useGridSize();
  const scrollPosition = useScrollPosition();
  const { activeLayer } = Paper.project;
  useInteractionManager();

  useEffect(() => {
    renderer.init();

    return () => {
      if (activeLayer) gsap.killTweensOf(activeLayer.view);
    };
  }, [renderer.init]);

  useEffect(() => {
    renderer.zoomTo(zoom);
  }, [zoom, renderer.zoomTo]);

  useEffect(() => {
    const { center: viewCenter } = activeLayer.view.bounds;

    const newPosition = new Coords(
      scrollPosition.x + viewCenter.x,
      scrollPosition.y + viewCenter.y
    );

    renderer.container.current.position.set(newPosition.x, newPosition.y);
  }, [scrollPosition]);

  // Move cursor
  useEffect(() => {
    if (mode.type !== 'CURSOR') return;

    const tile = getTileFromMouse({
      gridSize,
      mouse: mouse.position,
      scroll: scrollPosition
    });

    const tilePosition = getTilePosition(tile);
    renderer.cursor.moveTo(tilePosition);
  }, [mode, mouse.position, renderer.cursor.moveTo, gridSize, scrollPosition]);

  // Pan
  useEffect(() => {
    renderer.scrollTo(scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    const isCursorVisible = mode.type === 'CURSOR';

    renderer.cursor.setVisible(isCursorVisible);
  }, [mode.type, mouse.position]);

  return (
    <>
      {scene.nodes.map((node) => (
        <Node
          key={node.id}
          {...node}
          parentContainer={renderer.nodeManager.container as paper.Group}
        />
      ))}
    </>
  );
};

const render = () => {
  if (Paper.view) {
    if (global.requestAnimationFrame) {
      const raf = global.requestAnimationFrame(render);

      return raf;
    }

    Paper.view.update();
  }
};

const NodeContextMenu = (node: NodeSchemaI) => {
  const container = useRef<HTMLDivElement>();
  const scrollPosition = useScrollPosition();
  const zoom = useZoom();

  useEffect(() => {
    if (!container.current) return;

    const screenPosition = getTileScreenPosition(
      new Coords(node.position.x, node.position.y),
      scrollPosition,
      zoom
    );

    gsap.to(container.current, {
      duration: 0.1,
      left: screenPosition.x,
      top: screenPosition.y
    });
  }, [node.position, scrollPosition, zoom]);

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

const DomOverlay = () => {
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

export const Initialiser = () => {
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsReady(false);

    if (!containerRef.current) return;

    Paper.settings = {
      insertItems: false,
      applyMatrix: false
    };

    Paper.setup(containerRef.current);

    const rafId = render();

    setIsReady(true);

    return () => {
      setIsReady(false);
      if (rafId) cancelAnimationFrame(rafId);

      Paper.projects.forEach((project) => project.remove());
    };
  }, []);

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
      <canvas
        ref={containerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
      {isReady && <Renderer />}
      {isReady && <DomOverlay />}
      {/* <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
      </Box> */}
    </Box>
  );
};
