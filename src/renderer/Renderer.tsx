import React, { useEffect, useState } from 'react';
import Paper from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { Initialiser } from './Initialiser';
import { useRenderer } from './useRenderer';
import { Node } from './components/node/Node';
import { getTileFromMouse, getTilePosition } from './utils/gridHelpers';
import { ContextMenuLayer } from './components/ContextMenuLayer/ContextMenuLayer';

const InitialisedRenderer = () => {
  const renderer = useRenderer();
  const [isReady, setIsReady] = useState(false);
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
    setIsReady(true);

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
      mousePosition: mouse.position,
      scroll
    });

    const tilePosition = getTilePosition(tile);
    renderer.cursor.moveTo(tilePosition);
  }, [
    mode,
    mouse.position,
    renderer.cursor.moveTo,
    gridSize,
    scrollPosition,
    renderer.cursor,
    scroll
  ]);

  useEffect(() => {
    scrollTo(scrollPosition);
  }, [scrollPosition, scrollTo]);

  useEffect(() => {
    const isCursorVisible = mode.type === 'CURSOR';

    renderer.cursor.setVisible(isCursorVisible);
  }, [mode.type, mouse.position, renderer.cursor]);

  if (!isReady) return null;

  return (
    <>
      {scene.nodes.map((node) => (
        <Node
          key={node.id}
          node={node}
          parentContainer={renderer.nodeManager.container as paper.Group}
        />
      ))}
    </>
  );
};

export const Renderer = () => (
  <Initialiser>
    <InitialisedRenderer />
    <ContextMenuLayer />
  </Initialiser>
);
