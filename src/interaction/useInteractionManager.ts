import { useCallback, useEffect, useRef, useState } from 'react';
import { produce } from 'immer';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { InteractionReducer, State } from 'src/types';
import { getMouse } from 'src/utils';
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
  const reducerTypeRef = useRef<string>();
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
  const sceneActions = useSceneStore((state) => {
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

      if (!reducerAction) return;

      const nextMouse = getMouse({
        interactiveElement: rendererRef.current,
        zoom,
        scroll,
        lastMouse: mouse,
        mouseEvent: e,
        rendererSize
      });

      const baseState: State = {
        scene,
        mouse: nextMouse,
        mode,
        scroll,
        contextMenu,
        itemControls
      };

      const getTransitionaryState = () => {
        if (reducerTypeRef.current === reducer.type) return null;

        const prevReducerExitFn = reducerTypeRef.current
          ? reducers[reducerTypeRef.current].exit
          : null;
        const nextReducerEntryFn = reducer.entry;

        reducerTypeRef.current = reducer.type;

        const transitionaryState: State = baseState;

        const setTransitionaryState = (state: State, transitionaryFn: any) => {
          return produce(state, (draft) => {
            return transitionaryFn(draft);
          });
        };

        if (prevReducerExitFn) {
          setTransitionaryState(transitionaryState, prevReducerExitFn);
        }

        if (nextReducerEntryFn) {
          setTransitionaryState(transitionaryState, nextReducerEntryFn);
        }

        return null;
      };

      const transitionaryState = getTransitionaryState();
      const newState = produce(transitionaryState ?? baseState, (draft) => {
        return reducerAction(draft);
      });

      uiStateActions.setMouse(nextMouse);
      uiStateActions.setScroll(newState.scroll);
      uiStateActions.setMode(newState.mode);
      uiStateActions.setContextMenu(newState.contextMenu);
      uiStateActions.setSidebar(newState.itemControls);
      sceneActions.updateScene(newState.scene);
    },
    [
      mode,
      mouse,
      scroll,
      itemControls,
      uiStateActions,
      sceneActions,
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
