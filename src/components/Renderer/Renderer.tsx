import React, { useRef, useEffect, useState } from 'react';
import Paper from 'paper';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useRenderer } from './useRenderer';
import { Node } from './Node';
import { useInterfaceManager } from './interfaceManager/useInterfaceManager';
import { Select } from './interfaceManager/Select';
import { useAppState } from './useAppState';
import { Coords } from '../../utils/Coords';

export const Renderer = () => {
  const renderer = useRenderer();
  const interfaceManager = useInterfaceManager();
  const scene = useAppState((state) => state.scene);
  const isRendererReady = useAppState((state) => state.isRendererReady);
  const zoom = useAppState((state) => state.zoom);
  const scroll = useAppState((state) => state.scroll);
  const { activeLayer } = Paper.project;
  // const setZoom = useAppState((state) => state.setZoom);
  // const setScroll = useAppState((state) => state.setScroll);
  // const setGridSize = useAppState((state) => state.setGridSize);

  useEffect(() => {
    renderer.init();
    interfaceManager.activateMode(Select);

    return () => {
      if (activeLayer) gsap.killTweensOf(activeLayer.view);
      interfaceManager.destroy();
    };
  }, [renderer.init, interfaceManager.activateMode, interfaceManager.destroy]);

  useEffect(() => {
    activeLayer.view.zoom = zoom;
  }, [zoom]);

  useEffect(() => {
    const { center: viewCenter } = activeLayer.view.bounds;

    const newPosition = new Coords(
      scroll.position.x + viewCenter.x,
      scroll.position.y + viewCenter.y,
    );

    renderer.container.current.position.set(newPosition.x, newPosition.y);
  }, [scroll, isRendererReady]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setGridSize(new Coords(10, 10));
  //   }, 5000);
  // }, [setGridSize]);

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
      applyMatrix: false,
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
        height: '100%',
      }}
    >
      <Box
        component="canvas"
        ref={containerRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {isReady && <Renderer />}
      </Box>
    </Box>
  );
};
