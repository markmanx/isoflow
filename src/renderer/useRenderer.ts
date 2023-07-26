import { useCallback, useRef } from 'react';
import Paper, { Group } from 'paper';
import { Coords } from 'src/utils/Coords';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { useGrid } from './components/Grid/useGrid';
import { useNodeManager } from './useNodeManager';
import { useCursor } from './components/Cursor/useCursor';
import { useGroupManager } from './useGroupManager';

export const useRenderer = () => {
  const container = useRef(new Group());
  const innerContainer = useRef(new Group());
  // TODO: Store layers in a giant ref object called layers?  layers = { lasso: new Group(), grid: new Group() etc }
  const lassoContainer = useRef(new Group());
  const grid = useGrid();
  const nodeManager = useNodeManager();
  const groupManager = useGroupManager();
  const cursor = useCursor();
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const { setScroll } = uiStateActions;
  const { init: initGrid } = grid;
  const { init: initCursor } = cursor;

  const zoomTo = useCallback((zoom: number) => {
    Paper.project.activeLayer.view.zoom = zoom;
  }, []);

  const init = useCallback(
    (gridSize: Coords) => {
      const gridContainer = initGrid(gridSize);
      const cursorContainer = initCursor();

      innerContainer.current.addChild(gridContainer);
      innerContainer.current.addChild(groupManager.container);
      innerContainer.current.addChild(cursorContainer);
      innerContainer.current.addChild(lassoContainer.current);
      innerContainer.current.addChild(nodeManager.container);
      container.current.addChild(innerContainer.current);
      container.current.set({ position: [0, 0] });
      Paper.project.activeLayer.addChild(container.current);
      setScroll({
        position: new Coords(0, 0),
        offset: new Coords(0, 0)
      });
    },
    [initGrid, initCursor, setScroll, nodeManager.container]
  );

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
    groupManager,
    cursor,
    lassoContainer
  };
};
