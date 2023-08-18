import { useCallback, useEffect, useRef } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { ModeActions, State } from 'src/types';
import { getMouse } from 'src/utils';
import { Cursor } from './modes/Cursor';
import { DragItems } from './modes/DragItems';
import { RectangleTool } from './modes/RectangleTool';
import { Connector } from './modes/Connector';
import { Pan } from './modes/Pan';
import { PlaceElement } from './modes/PlaceElement';

const modes: { [k in string]: ModeActions } = {
  CURSOR: Cursor,
  DRAG_ITEMS: DragItems,
  RECTANGLE_TOOL: RectangleTool,
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
    (e: MouseEvent | TouchEvent) => {
      if (!rendererRef.current || !uiState.interactionsEnabled) return;

      const mode = modes[uiState.mode.type];

      const getModeFunction = () => {
        switch (e.type) {
          case 'touchmove':
          case 'mousemove':
            return mode.mousemove;
          case 'touchstart':
          case 'mousedown':
            return mode.mousedown;
          case 'touchend':
          case 'mouseup':
            return mode.mouseup;
          default:
            return null;
        }
      };

      const modeFunction = getModeFunction();

      if (!modeFunction) return;

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

      if (reducerTypeRef.current !== uiState.mode.type) {
        const prevReducer = reducerTypeRef.current
          ? modes[reducerTypeRef.current]
          : null;

        if (prevReducer && prevReducer.exit) {
          prevReducer.exit(baseState);
        }

        if (mode.entry) {
          mode.entry(baseState);
        }
      }

      modeFunction(baseState);
      reducerTypeRef.current = uiState.mode.type;
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
