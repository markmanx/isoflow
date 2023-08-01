import { useCallback, useRef } from 'react';
import Paper, { Group } from 'paper';
import { Coords } from 'src/types';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { CoordsUtils } from 'src/utils';
import { useNodeManager } from './useNodeManager';
import { useGroupManager } from './useGroupManager';
import { useConnectorManager } from './useConnectorManager';

export const useRenderer = () => {
  const container = useRef(new Group());
  const innerContainer = useRef(new Group());
  // TODO: Store layers in a giant ref object called layers?  layers = { lasso: new Group(), grid: new Group() etc }
  const lassoContainer = useRef(new Group());
  const nodeManager = useNodeManager();
  const connectorManager = useConnectorManager();
  const groupManager = useGroupManager();
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const { setScroll } = uiStateActions;

  const zoomTo = useCallback((zoom: number) => {
    Paper.project.activeLayer.view.zoom = zoom;
  }, []);

  const init = useCallback(() => {
    // TODO: Grid and Cursor should be initialised in their JSX components (create if they don't exist)
    // to be inline with other initialisation patterns

    // innerContainer.current.addChild(gridContainer);
    innerContainer.current.addChild(groupManager.container);
    innerContainer.current.addChild(lassoContainer.current);
    innerContainer.current.addChild(connectorManager.container);
    innerContainer.current.addChild(nodeManager.container);
    container.current.addChild(innerContainer.current);
    container.current.set({ position: [0, 0] });
    Paper.project.activeLayer.addChild(container.current);
    setScroll({
      position: CoordsUtils.zero(),
      offset: CoordsUtils.zero()
    });
  }, [setScroll, nodeManager.container, groupManager.container]);

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
    zoomTo,
    scrollTo,
    nodeManager,
    groupManager,
    lassoContainer,
    connectorManager
  };
};
