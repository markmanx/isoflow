import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { useRenderer } from './useRenderer';
import { Node } from './Node';
import { useInterfaceManager } from './interfaceManager/useInterfaceManager';
import { Select } from './interfaceManager/Select';
import { useAppState } from './useAppState';
import { Coords } from '../../utils/Coords';

export const Renderer = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRenderer();
  const interfaceManager = useInterfaceManager();
  const scene = useAppState((state) => state.scene);
  const isRendererReady = useAppState((state) => state.isRendererReady);
  const zoom = useAppState((state) => state.zoom);
  const scroll = useAppState((state) => state.scroll);
  // const setZoom = useAppState((state) => state.setZoom);
  // const setScroll = useAppState((state) => state.setScroll);
  // const setGridSize = useAppState((state) => state.setGridSize);

  useEffect(() => {
    if (!containerRef.current) return;

    renderer.init(containerRef.current);
    interfaceManager.activateMode(Select);

    return () => {
      if (renderer.activeLayer.current) gsap.killTweensOf(renderer.activeLayer.current.view);
      renderer.destroy();
      interfaceManager.destroy();
    };
  }, [renderer.init, interfaceManager.activateMode, renderer.destroy, interfaceManager.destroy]);

  useEffect(() => {
    if (!isRendererReady || !renderer.activeLayer.current?.view) return;

    gsap.killTweensOf(renderer.activeLayer.current.view);
    gsap.to(renderer.activeLayer.current.view, {
      duration: 0.25,
      zoom,
    });
  }, [zoom, isRendererReady]);

  useEffect(() => {
    if (!isRendererReady || !renderer.activeLayer.current?.view || !renderer.container.current) return;

    const { center: viewCenter } = renderer.activeLayer.current.view.bounds;

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
      {isRendererReady && scene.nodes.map((node) => (
        <Node
          key={node.id}
          {...node}
          parentContainer={renderer.nodeManager.container as paper.Group}
        />
      ))}
    </Box>
  );
};
