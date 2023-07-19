import { useCallback, useRef } from 'react';
import Paper, { Group } from 'paper';
import gsap from 'gsap';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { useGrid } from './components/grid/useGrid';
import { useNodeManager } from './useNodeManager';
import { useCursor } from './components/cursor/useCursor';

export const useRenderer = () => {
  const container = useRef(new Group());
  const innerContainer = useRef(new Group());
  const grid = useGrid();
  const nodeManager = useNodeManager();
  const cursor = useCursor();
  const uiStateActions = useUiStateStore((state) => state.actions);

  const { setScroll } = uiStateActions;
  const { init: initGrid } = grid;
  const { init: initCursor } = cursor;

  const zoomTo = useCallback((zoom: number) => {
    gsap.to(Paper.project.activeLayer.view, {
      duration: 0.25,
      zoom
    });
  }, []);

  const init = useCallback(() => {
    const gridContainer = initGrid();
    const cursorContainer = initCursor();

    innerContainer.current.addChild(gridContainer);
    innerContainer.current.addChild(cursorContainer);
    innerContainer.current.addChild(nodeManager.container);
    container.current.addChild(innerContainer.current);
    container.current.set({ position: [0, 0] });
    Paper.project.activeLayer.addChild(container.current);
    setScroll({
      position: new Coords(0, 0),
      offset: new Coords(0, 0)
    });
  }, [initGrid, initCursor, setScroll, nodeManager.container]);

  const scrollTo = useCallback((to: Coords) => {
    const { center: viewCenter } = Paper.project.view.bounds;

    const newPosition = {
      x: to.x + viewCenter.x,
      y: to.y + viewCenter.y
    };

    container.current.position.set(newPosition);
  }, []);

  return {
    init,
    container,
    grid,
    zoomTo,
    scrollTo,
    nodeManager,
    cursor
  };
};
