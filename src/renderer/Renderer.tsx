import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import gsap from 'gsap';
import { Box } from '@mui/material';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore, useSceneStore } from 'src/stores';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { Initialiser } from './Initialiser';
import { useRenderer } from './useRenderer';
import { Node } from './components/node/Node';
import {
  getTileFromMouse,
  getTilePosition,
  getTileScreenPosition
} from './utils/gridHelpers';

const InitialisedRenderer = () => {
  const renderer = useRenderer();
  const scene = useSceneStore(({ nodes }) => ({ nodes }));
  const gridSize = useSceneStore((state) => state.gridSize);
  const mode = useUiStateStore((state) => state.mode);
  const zoom = useUiStateStore((state) => state.zoom);
  const mouse = useUiStateStore((state) => state.mouse);
  const scroll = useUiStateStore((state) => state.scroll);
  const { activeLayer } = Paper.project;
  useInteractionManager();

  const {
    init: initRenderer,
    zoomTo,
    container: rendererContainer,
    scrollTo
  } = renderer;
  const { position: scrollPosition } = scroll;

  useEffect(() => {
    initRenderer();

    return () => {
      if (activeLayer) gsap.killTweensOf(activeLayer.view);
    };
  }, [initRenderer, activeLayer]);

  useEffect(() => {
    zoomTo(zoom);
  }, [zoom, zoomTo]);

  useEffect(() => {
    const { center: viewCenter } = activeLayer.view.bounds;

    const newPosition = new Coords(
      scrollPosition.x + viewCenter.x,
      scrollPosition.y + viewCenter.y
    );

    rendererContainer.current.position.set(newPosition.x, newPosition.y);
  }, [scrollPosition, rendererContainer, activeLayer.view.bounds]);

  useEffect(() => {
    if (mode.type !== 'CURSOR') return;

    const tile = getTileFromMouse({
      gridSize,
      mouse: mouse.position,
      scroll: scrollPosition
    });

    const tilePosition = getTilePosition(tile);
    renderer.cursor.moveTo(tilePosition);
  }, [
    mode,
    mouse.position,
    renderer.cursor.moveTo,
    gridSize,
    scrollPosition,
    renderer.cursor
  ]);

  useEffect(() => {
    scrollTo(scrollPosition);
  }, [scrollPosition, scrollTo]);

  useEffect(() => {
    const isCursorVisible = mode.type === 'CURSOR';

    renderer.cursor.setVisible(isCursorVisible);
  }, [mode.type, mouse.position, renderer.cursor]);

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

// const NodeContextMenu = (node: NodeSchemaI) => {
//   const container = useRef<HTMLDivElement>();
//   const scrollPosition = useScrollPosition();
//   const zoom = useZoom();

//   useEffect(() => {
//     if (!container.current) return;

//     const screenPosition = getTileScreenPosition(
//       new Coords(node.position.x, node.position.y),
//       scrollPosition,
//       zoom
//     );

//     gsap.to(container.current, {
//       duration: 0.1,
//       left: screenPosition.x,
//       top: screenPosition.y
//     });
//   }, [node.position, scrollPosition, zoom]);

//   return (
//     <Box
//       ref={container}
//       sx={{
//         position: 'absolute',
//         width: 100,
//         height: 100,
//         bgcolor: 'primary.main'
//       }}
//     >
//       {node.id}
//     </Box>
//   );
// };

export const Renderer = () => (
  <Initialiser>
    <InitialisedRenderer />
  </Initialiser>
);
