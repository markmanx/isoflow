import React, { useRef, useEffect, useState } from 'react';
import Paper from 'paper';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useRenderer } from './useRenderer';
import { Node } from './Node';
import { getTileFromMouse, getTilePosition } from './utils/gridHelpers';
import { useInterfaceManager } from './interfaceManager/useInterfaceManager';
import { useZoom } from '../../stores/useZoomStore';
import { useScroll } from '../../stores/useScrollStore';
import { Coords } from '../../utils/Coords';
import { useGridSize, useScene } from '../../stores/useSceneStore';
import { useMode } from '../../stores/useModeStore';
import { useMouse } from '../../stores/useMouseStore';

export const Renderer = () => {
  const renderer = useRenderer();
  const scene = useScene();
  const mode = useMode();
  const zoom = useZoom();
  const mouse = useMouse();
  const gridSize = useGridSize();
  const scroll = useScroll();
  const { activeLayer } = Paper.project;
  useInterfaceManager();

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
      scroll.position.x + viewCenter.x,
      scroll.position.y + viewCenter.y
    );

    renderer.container.current.position.set(newPosition.x, newPosition.y);
  }, [scroll.position]);

  // Move cursor
  useEffect(() => {
    if (mode.type !== 'SELECT') return;

    const tile = getTileFromMouse({
      gridSize,
      mouse: mouse.position,
      scroll: scroll.position
    });

    const tilePosition = getTilePosition(tile);
    renderer.cursor.moveTo(tilePosition);
  }, [mode, mouse.position, renderer.cursor.moveTo, gridSize, scroll.position]);

  // Pan
  useEffect(() => {
    renderer.scrollTo(scroll.position);
  }, [scroll.position]);

  useEffect(() => {
    const isCursorVisible = mode.type === 'SELECT';

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
