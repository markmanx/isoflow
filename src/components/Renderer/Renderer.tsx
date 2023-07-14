import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import { Box } from '@mui/material';
import { useRenderer } from './useRenderer';
import { Node } from './Node';
import { useInterfaceManager } from './interfaceManager/useInterfaceManager';
import { Select } from './interfaceManager/Select';
import { useAppState } from './useAppState';
// import { Coords } from '../../utils/Coords';

export const Renderer = () => {
  const containerRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRenderer();
  const interfaceManager = useInterfaceManager();
  const scene = useAppState((state) => state.scene);
  // const setZoom = useAppState((state) => state.setZoom);
  // const setScroll = useAppState((state) => state.setScroll);
  // const setGridSize = useAppState((state) => state.setGridSize);

  useEffect(() => {
    console.log('RENDERER USEEFFECT MOUNTING', Paper.projects);

    if (!containerRef.current) return;

    renderer.init(containerRef.current);
    interfaceManager.activateMode(Select);

    return () => {
      console.log('RENDERER USEEFFECT UNMOUNTING', Paper.projects);

      renderer.destroy();
      interfaceManager.destroy();
    };
  }, [renderer.init, interfaceManager.activateMode, renderer.destroy, interfaceManager.destroy]);

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
      {renderer.isReady && scene.nodes.map((node) => (
        <Node
          key={node.id}
          {...node}
          parentContainer={renderer.nodeManager.container as paper.Group}
        />
      ))}
    </Box>
  );
};
