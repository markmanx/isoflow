import { useCallback, useEffect, useRef, useState } from 'react';
import { produce } from 'immer';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { CoordsUtils, screenToIso } from 'src/utils';
import { InteractionReducer, Mouse, State, Coords } from 'src/types';
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
  const rendererRef = useRef<HTMLElement>();
  const [isEnabled, setIsEnabled] = useState(true);
  const destroyListeners = useRef<() => void>();
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
  const rendererSize = useUiStateStore((state) => {
    return state.rendererSize;
  });

  const onMouseEvent = useCallback(
    (e: MouseEvent) => {
      if (!rendererRef.current) return;

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
      const componentOffset = rendererRef.current?.getBoundingClientRect();
      const offset: Coords = {
        x: componentOffset?.left ?? 0,
        y: componentOffset?.top ?? 0
      };

      const mousePosition = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      };

      const newPosition: Mouse['position'] = {
        screen: mousePosition,
        tile: screenToIso({
          mouse: mousePosition,
          zoom,
          scroll,
          rendererSize
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
      zoom,
      rendererSize
    ]
  );

  // TODO: Needs optimisation, listeners are added / removed every time the mouse position changes.  Very intensive.
  useEffect(() => {
    if (!rendererRef.current || !isEnabled) {
      destroyListeners.current?.();
      return;
    }

    const el = rendererRef.current;

    el.addEventListener('mousemove', onMouseEvent);
    el.addEventListener('mousedown', onMouseEvent);
    el.addEventListener('mouseup', onMouseEvent);

    destroyListeners.current = () => {
      el.removeEventListener('mousemove', onMouseEvent);
      el.removeEventListener('mousedown', onMouseEvent);
      el.removeEventListener('mouseup', onMouseEvent);
    };

    return destroyListeners.current;
  }, [onMouseEvent, isEnabled]);

  const setElement = useCallback((element: HTMLElement) => {
    rendererRef.current = element;
  }, []);

  return {
    setElement,
    setIsEnabled
  };
};
