import React, { useEffect, useState } from 'react';
import Paper from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useInteractionManager } from 'src/interaction/useInteractionManager';
import { Initialiser } from './Initialiser';
import { useRenderer } from './useRenderer';
import { Node } from './components/Node/Node';
import { getTilePosition } from './utils/gridHelpers';
import { ContextMenuLayer } from './components/ContextMenuLayer/ContextMenuLayer';
import { Lasso } from './components/Lasso/Lasso';
import { Group } from './components/Group/Group';

const InitialisedRenderer = () => {
  const renderer = useRenderer();
  const [isReady, setIsReady] = useState(false);
  const scene = useSceneStore(({ nodes, groups }) => {
    return { nodes, groups };
  });
  const gridSize = useSceneStore((state) => {
    return state.gridSize;
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
    initRenderer(gridSize);
    setIsReady(true);

    return () => {
      if (activeLayer) gsap.killTweensOf(activeLayer.view);
    };
  }, [initRenderer, activeLayer, gridSize.toString()]);

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

    const { tile } = mouse.position;

    const tilePosition = getTilePosition(tile);
    renderer.cursor.moveTo(tilePosition);
  }, [
    mode,
    mouse,
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
  }, [mode.type, renderer.cursor]);

  if (!isReady) return null;

  return (
    <>
      {mode.type === 'LASSO' && (
        <Lasso
          parentContainer={renderer.lassoContainer.current as paper.Group}
          startTile={mode.selection.startTile}
          endTile={mode.selection.endTile}
        />
      )}
      {scene.groups.map((group) => {
        return (
          <Group
            key={group.id}
            group={group}
            parentContainer={renderer.groupManager.container as paper.Group}
          />
        );
      })}
      {scene.nodes.map((node) => {
        return (
          <Node
            key={node.id}
            node={node}
            parentContainer={renderer.nodeManager.container as paper.Group}
          />
        );
      })}
    </>
  );
};

export const Renderer = () => {
  return (
    <Initialiser>
      <InitialisedRenderer />
      <ContextMenuLayer />
    </Initialiser>
  );
};
