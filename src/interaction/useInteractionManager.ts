import { useCallback, useEffect, useRef } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { InteractionReducer, State } from 'src/types';
import { getMouse } from 'src/utils';
import { Cursor } from './modes/Cursor';
import { DragItems } from './modes/DragItems';
import { AreaTool } from './modes/AreaTool';
import { Connector } from './modes/Connector';
import { Pan } from './modes/Pan';
import { PlaceElement } from './modes/PlaceElement';

const reducers: { [k in string]: InteractionReducer } = {
  CURSOR: Cursor,
  DRAG_ITEMS: DragItems,
  AREA_TOOL: AreaTool,
  CONNECTOR: Connector,
  PAN: Pan,
  PLACE_ELEMENT: PlaceElement
};

export const useInteractionManager = () => {
  const rendererRef = useRef<HTMLElement>();
  const reducerTypeRef = useRef<string>();
  const uiState = useUiStateStore((state) => {
    return state;
  });
  const scene = useSceneStore((state) => {
    return state;
  });

  const onMouseEvent = useCallback(
    (e: MouseEvent) => {
      if (!rendererRef.current || !uiState.interactionsEnabled) return;

      const reducer = reducers[uiState.mode.type];

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
        zoom: uiState.zoom,
        scroll: uiState.scroll,
        lastMouse: uiState.mouse,
        mouseEvent: e,
        rendererSize: uiState.rendererSize
      });

      uiState.actions.setMouse(nextMouse);

      const baseState: State = {
        scene,
        uiState,
        rendererRef: rendererRef.current,
        isRendererInteraction: rendererRef.current === e.target
      };

      if (reducerTypeRef.current !== reducer.type) {
        const prevReducer = reducerTypeRef.current
          ? reducers[reducerTypeRef.current]
          : null;

        if (prevReducer && prevReducer.exit) {
          prevReducer.exit(baseState);
        }

        if (reducer.entry) {
          reducer.entry(baseState);
        }
      }

      reducerAction(baseState);
      reducerTypeRef.current = reducer.type;
    },
    [scene, uiState]
  );

  useEffect(() => {
    const el = window;

    el.addEventListener('mousemove', onMouseEvent);
    el.addEventListener('mousedown', onMouseEvent);
    el.addEventListener('mouseup', onMouseEvent);

    return () => {
      el.removeEventListener('mousemove', onMouseEvent);
      el.removeEventListener('mousedown', onMouseEvent);
      el.removeEventListener('mouseup', onMouseEvent);
    };
  }, [onMouseEvent]);

  const setElement = useCallback((element: HTMLElement) => {
    rendererRef.current = element;
  }, []);

  return {
    setElement
  };
};
