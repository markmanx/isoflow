import {
  useCallback, useRef, useEffect,
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
  const isRendererReady = useAppState((state) => state.isRendererReady);
  const setIsRendererReady = useAppState((state) => state.setIsRendererReady);
  const rafRef = useRef<number>();
  const container = useRef<paper.Group>();
  const activeLayer = useRef<paper.Layer>();
  const grid = useGrid();
  const nodeManager = useNodeManager();
  const cursor = useCursor();
  const setScroll = useAppState((state) => state.setScroll);

  const loadScene = useCallback(
    (scene: SceneI) => {
      if (!container.current || !isRendererReady) return;

      scene.nodes.forEach((node) => {
        nodeManager.createNode({
          ...node,
          position: new Coords(node.position.x, node.position.y),
        });
      });
    },
    [isRendererReady, nodeManager],
  );

  const destroy = useCallback(() => {
    // nodeManager.destroy();
    setIsRendererReady(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    Paper.projects.forEach((project) => project.remove());
    container.current?.remove();
  }, [setIsRendererReady]);

  const init = useCallback(
    (canvas: HTMLCanvasElement) => {
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
      setIsRendererReady(true);
    },
    [
      grid.init,
      nodeManager.init,
      cursor.init,
      setScroll,
      destroy,
      setIsRendererReady,
    ],
  );

  return {
    init,
    container,
    grid,
    nodeManager,
    loadScene,
    destroy,
    activeLayer,
  };
};
