import {
  useCallback, useRef,
} from 'react';
import Paper, { Group } from 'paper';
import gsap from 'gsap';
import { useGrid } from './useGrid';
import { useNodeManager } from './useNodeManager';
import { SceneI } from '../../validation/SceneSchema';
import { Coords } from '../../utils/Coords';
import { useAppState } from './useAppState';
import { useCursor } from './useCursor';

export const useRenderer = () => {
  const container = useRef(new Group());
  const grid = useGrid();
  const nodeManager = useNodeManager();
  const cursor = useCursor();
  const setScroll = useAppState((state) => state.setScroll);

  const zoomTo = useCallback((zoom: number) => {
    gsap.to(Paper.project.activeLayer.view, {
      duration: 0.25,
      zoom,
    });
  }, []);

  const loadScene = useCallback(
    (scene: SceneI) => {
      scene.nodes.forEach((node) => {
        nodeManager.createNode({
          ...node,
          position: new Coords(node.position.x, node.position.y),
        });
      });
    },
    [nodeManager.createNode],
  );

  const init = useCallback(
    () => {
      const gridContainer = grid.init();
      const cursorContainer = cursor.init();

      container.current.addChild(gridContainer);
      container.current.addChild(cursorContainer);
      container.current.addChild(nodeManager.container);
      Paper.project.activeLayer.addChild(container.current);
      setScroll({ position: new Coords(0, 0) });
    },
    [
      grid.init,
      cursor.init,
      setScroll,
    ],
  );

  return {
    init,
    container,
    grid,
    zoomTo,
    nodeManager,
    loadScene,
    cursor,
  };
};
