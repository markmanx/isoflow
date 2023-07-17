import React, { useRef, useEffect, useState } from 'react';
import Paper from 'paper';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useRenderer } from './useRenderer';
import { Node } from './Node';
import { useInterfaceManager } from './interfaceManager/useInterfaceManager';
import { useZoom } from '../../stores/useZoomStore';
import { useScrollPosition } from '../../stores/useScrollStore';
import { useAppState } from './useAppState';
import { Coords } from '../../utils/Coords';

export const Renderer = () => {
  const renderer = useRenderer();
  const scene = useAppState((state) => state.scene);
  const zoom = useZoom();
  const scrollPosition = useScrollPosition();
  const { activeLayer } = Paper.project;
  useInterfaceManager();
  const { position: cursorPosition } = useAppState((state) => state.cursor);

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

  useEffect(() => {
    renderer.cursor.moveTo(cursorPosition);
  }, [cursorPosition, renderer.cursor.moveTo]);

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
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        {isReady && <Renderer />}
      </Box>
    </Box>
  );
};
