import { useCallback, useEffect } from 'react';
import { produce } from 'immer';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { CoordsUtils, screenToIso } from 'src/utils';
import { InteractionReducer, Mouse, State } from 'src/types';
import { DragItems } from './reducers/DragItems';
import { Pan } from './reducers/Pan';
import { Cursor } from './reducers/Cursor';
import { Lasso } from './reducers/Lasso';

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
  const zoom = useUiStateStore((state) => {
    return state.zoom;
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
  const scene = useSceneStore(({ nodes, connectors, groups, icons }) => {
    return { nodes, connectors, groups, icons };
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

      const newPosition: Mouse['position'] = {
        screen: { x: e.clientX, y: e.clientY },
        tile: screenToIso({
          mouse: { x: e.clientX, y: e.clientY },
          zoom,
          scroll
        })
      };

      const newDelta: Mouse['delta'] = {
        screen: CoordsUtils.subtract(newPosition.screen, mouse.position.screen),
        tile: CoordsUtils.subtract(newPosition.tile, mouse.position.tile)
      };

      const getMousedown = (): Mouse['mousedown'] => {
        switch (e.type) {
          case 'mousedown':
            return newPosition;
          case 'mousemove':
            return mouse.mousedown;
          default:
            return null;
        }
      };

      const nextMouse: Mouse = {
        position: newPosition,
        delta: newDelta,
        mousedown: getMousedown()
      };

      const baseState: State = {
        scene,
        mouse: nextMouse,
        mode,
        scroll,
        contextMenu,
        itemControls
      };

      const newState = produce(baseState, (draft) => {
        return reducerAction(draft);
      });

      uiStateActions.setMouse(nextMouse);
      uiStateActions.setScroll(newState.scroll);
      uiStateActions.setMode(newState.mode);
      uiStateActions.setContextMenu(newState.contextMenu);
      uiStateActions.setSidebar(newState.itemControls);
    },
    [
      mode,
      mouse.position.screen,
      mouse.position.tile,
      mouse.mousedown,
      scroll,
      itemControls,
      uiStateActions,
      scene,
      contextMenu,
      zoom
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
