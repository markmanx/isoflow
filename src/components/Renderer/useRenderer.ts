import { useCallback, useRef } from 'react';
import Paper, { Group } from 'paper';
import gsap from 'gsap';
import { useGrid } from './useGrid';
import { useNodeManager } from './useNodeManager';
import { SceneI } from '../../validation/SceneSchema';
import { Coords } from '../../utils/Coords';
import { useCursor } from './useCursor';
import { useScrollActions } from '../../stores/useScrollStore';

export const useRenderer = () => {
  const container = useRef(new Group());
  const innerContainer = useRef(new Group());
  const grid = useGrid();
  const nodeManager = useNodeManager();
  const cursor = useCursor();
  const scrollActions = useScrollActions();

  const zoomTo = useCallback((zoom: number) => {
    gsap.to(Paper.project.activeLayer.view, {
      duration: 0.25,
      zoom
    });
  }, []);

  const loadScene = useCallback(
    (scene: SceneI) => {
      scene.nodes.forEach((node) => {
        nodeManager.createNode({
          ...node,
          position: new Coords(node.position.x, node.position.y)
        });
      });
    },
    [nodeManager.createNode]
  );

  const init = useCallback(() => {
    const gridContainer = grid.init();
    const cursorContainer = cursor.init();

    innerContainer.current.addChild(gridContainer);
    innerContainer.current.addChild(cursorContainer);
    innerContainer.current.addChild(nodeManager.container);
    container.current.addChild(innerContainer.current);
    container.current.set({ position: [0, 0] });
    Paper.project.activeLayer.addChild(container.current);
    scrollActions.setPosition(new Coords(0, 0));
  }, [grid.init, cursor.init, setScroll]);

  return {
    init,
    container,
    grid,
    zoomTo,
    nodeManager,
    loadScene,
    cursor
  };
};
