import { useCallback, useEffect } from 'react';
import { produce } from 'immer';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useUiStateStore, Mouse } from 'src/stores/useUiStateStore';
import { Coords } from 'src/utils/Coords';
import { PROJECTED_TILE_DIMENSIONS } from 'src/renderer/utils/constants';
import { DragItems } from './reducers/DragItems';
import { Pan } from './reducers/Pan';
import { Cursor } from './reducers/Cursor';
import { Lasso } from './reducers/Lasso';
import type { InteractionReducer } from './types';

const reducers: { [k in string]: InteractionReducer } = {
  CURSOR: Cursor,
  DRAG_ITEMS: DragItems,
  PAN: Pan,
  LASSO: Lasso
};

export const useInteractionManager = () => {
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const scroll = useUiStateStore((state) => {
    return state.scroll;
  });
  const mouse = useUiStateStore((state) => {
    return state.mouse;
  });
  const itemControls = useUiStateStore((state) => {
    return state.itemControls;
  });
  const contextMenu = useUiStateStore((state) => {
    return state.contextMenu;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const scene = useSceneStore(({ nodes, connectors, groups }) => {
    return { nodes, connectors, groups };
  });
  const gridSize = useSceneStore((state) => {
    return state.gridSize;
  });
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });

  const onMouseEvent = useCallback(
    (e: MouseEvent) => {
      const reducer = reducers[mode.type];

      if (!reducer || e.type !== 'mousemove') return;

      const reducerAction = reducer[e.type];

      const halfH = PROJECTED_TILE_DIMENSIONS.x * 0.5;
      const halfW = PROJECTED_TILE_DIMENSIONS.y * 0.5;
      const mousePosition = new Coords(e.clientX, e.clientY);
      const canvasPosition = new Coords(
        mousePosition.x - scroll.position.x - window.innerWidth * 0.5,
        mousePosition.y - scroll.position.y - window.innerHeight * 0.5
      );
      const tile = new Coords(
        Math.floor((canvasPosition.x / halfW + canvasPosition.y / halfH) / 2),
        (canvasPosition.y / halfH - canvasPosition.x / halfW) / 2
      );

      const nextMouse: Mouse = {
        position: {
          screen: new Coords(e.clientX, e.clientY),
          tile
        },
        delta: null,
        mousedown: null
      };

      const newState = produce(
        {
          scene,
          mouse: nextMouse,
          mode,
          scroll,
          gridSize,
          contextMenu,
          itemControls
        },
        (draft) => {
          return reducerAction(draft);
        }
      );

      uiStateActions.setMouse(nextMouse);
      uiStateActions.setScroll(newState.scroll);
      uiStateActions.setMode(newState.mode);
      uiStateActions.setContextMenu(newState.contextMenu);
      uiStateActions.setSidebar(newState.itemControls);
      sceneActions.setItems(newState.scene);
    },
    [
      mode,
      scroll,
      gridSize,
      itemControls,
      uiStateActions,
      sceneActions,
      scene,
      contextMenu
    ]
  );

  useEffect(() => {
    window.addEventListener('mousemove', onMouseEvent);

    return () => {
      window.removeEventListener('mousemove', onMouseEvent);
    };
  }, [onMouseEvent]);
};
