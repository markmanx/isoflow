import {
  useCallback, useRef, useState, useEffect,
} from 'react';
import Paper, { Group } from 'paper';
import gsap from 'gsap';
import { useGrid } from './useGrid';
import { useNodeManager } from './useNodeManager';
import { SceneI } from '../../validation/SceneSchema';
import { Coords } from '../../utils/Coords';
import { useAppState } from './useAppState';
import { useCursor } from './useCursor';

const render = () => {
  if (Paper.view) {
    if (global.requestAnimationFrame) {
      const raf = global.requestAnimationFrame(render);

      return raf;
    }

    Paper.view.update();
  }
};

export const useRenderer = () => {
  const [isReady, setIsReady] = useState(false);
  const rafRef = useRef<number>();
  const container = useRef<paper.Group>();
  const activeLayer = useRef<paper.Layer>();
  const grid = useGrid();
  const nodeManager = useNodeManager();
  const cursor = useCursor();
  const zoom = useAppState((state) => state.zoom);
  const scroll = useAppState((state) => state.scroll);
  const setScroll = useAppState((state) => state.setScroll);

  const loadScene = useCallback(
    (scene: SceneI) => {
      if (!container.current || !isReady) return;

      scene.nodes.forEach((node) => {
        nodeManager.createNode({
          ...node,
          position: new Coords(node.position.x, node.position.y),
        });
      });
    },
    [isReady, nodeManager],
  );

  useEffect(() => {
    if (!isReady || !activeLayer.current?.view) return;

    gsap.killTweensOf(activeLayer.current.view);
    gsap.to(activeLayer.current.view, {
      duration: 0.25,
      zoom,
    });
  }, [zoom, isReady]);

  useEffect(() => {
    if (!isReady || !activeLayer.current?.view || !container.current) return;

    const { center: viewCenter } = activeLayer.current.view.bounds;

    const newPosition = new Coords(
      scroll.position.x + viewCenter.x,
      scroll.position.y + viewCenter.y,
    );

    container.current.position.set(newPosition.x, newPosition.y);
  }, [scroll, isReady]);

  const destroy = useCallback(() => {
    // nodeManager.destroy();

    setIsReady(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    Paper.projects.forEach((project) => project.remove());
    container.current?.remove();

    console.log('RENDERER DESTROY', Paper.projects);
  }, []);

  const init = useCallback(
    (canvas: HTMLCanvasElement) => {
      console.log('START INIT RENDERER', Paper.projects);

      destroy();

      Paper.settings = {
        insertItems: false,
        applyMatrix: false,
      };

      Paper.setup(canvas);
      activeLayer.current = Paper.project.activeLayer;

      const gridContainer = grid.init();
      const nodeContainer = nodeManager.init();
      const cursorContainer = cursor.init();

      container.current = new Group();
      container.current.addChild(gridContainer);
      container.current.addChild(cursorContainer);
      container.current.addChild(nodeContainer);
      activeLayer.current.addChild(container.current);
      setScroll({ position: new Coords(0, 0) });

      rafRef.current = render();
      setIsReady(true);
      console.log('FINISH INIT RENDERER', Paper.projects);
    },
    [
      grid.init,
      nodeManager.init,
      cursor.init,
      setScroll,
      destroy,
    ],
  );

  return {
    init,
    container: container.current,
    grid,
    nodeManager,
    loadScene,
    isReady,
    destroy,
  };
};
