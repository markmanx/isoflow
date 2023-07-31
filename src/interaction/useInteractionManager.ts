import { useCallback, useEffect } from 'react';
import { produce } from 'immer';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useUiStateStore, Mouse } from 'src/stores/useUiStateStore';
import { Coords } from 'src/utils/Coords';
import { screenToIso } from 'src/utils';
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

      if (
        !reducer ||
        !(
          e.type === 'mousemove' ||
          e.type === 'mouseup' ||
          e.type === 'mousedown'
        )
      )
        return;

      const reducerAction = reducer[e.type];

      const nextMouse: Mouse = {
        position: {
          screen: new Coords(e.clientX, e.clientY),
          tile: Coords.fromObject(screenToIso({ x: e.clientX, y: e.clientY }))
        },
        delta: {
          screen: new Coords(
            e.clientX - mouse.position.screen.x,
            e.clientY - mouse.position.screen.y
          ),
          tile: Coords.zero()
        },
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
    window.addEventListener('mousedown', onMouseEvent);
    window.addEventListener('mouseup', onMouseEvent);

    return () => {
      window.removeEventListener('mousemove', onMouseEvent);
      window.removeEventListener('mousedown', onMouseEvent);
      window.removeEventListener('mouseup', onMouseEvent);
    };
  }, [onMouseEvent]);
};
