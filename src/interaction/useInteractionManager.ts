import { useCallback, useEffect, useRef } from 'react';
import { useModelStore } from 'src/stores/modelStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { ModeActions, State, SlimMouseEvent } from 'src/types';
import { getMouse, getItemAtTile } from 'src/utils';
import { useResizeObserver } from 'src/hooks/useResizeObserver';
import { useScene } from 'src/hooks/useScene';
import { Cursor } from './modes/Cursor';
import { DragItems } from './modes/DragItems';
import { DrawRectangle } from './modes/Rectangle/DrawRectangle';
import { TransformRectangle } from './modes/Rectangle/TransformRectangle';
import { Connector } from './modes/Connector';
import { Pan } from './modes/Pan';
import { PlaceIcon } from './modes/PlaceIcon';
import { TextBox } from './modes/TextBox';

const modes: { [k in string]: ModeActions } = {
  CURSOR: Cursor,
  DRAG_ITEMS: DragItems,
  // TODO: Adopt this notation for all modes (i.e. {node.type}.{action})
  'RECTANGLE.DRAW': DrawRectangle,
  'RECTANGLE.TRANSFORM': TransformRectangle,
  CONNECTOR: Connector,
  PAN: Pan,
  PLACE_ICON: PlaceIcon,
  TEXTBOX: TextBox
};

const getModeFunction = (mode: ModeActions, e: SlimMouseEvent) => {
  switch (e.type) {
    case 'mousemove':
      return mode.mousemove;
    case 'mousedown':
      return mode.mousedown;
    case 'mouseup':
      return mode.mouseup;
    default:
      return null;
  }
};

export const useInteractionManager = () => {
  const rendererRef = useRef<HTMLElement>();
  const reducerTypeRef = useRef<string>();
  const uiState = useUiStateStore((state) => {
    return state;
  });
  const model = useModelStore((state) => {
    return state;
  });
  const scene = useScene();
  const { size: rendererSize } = useResizeObserver(uiState.rendererEl);

  const onMouseEvent = useCallback(
    (e: SlimMouseEvent) => {
      if (!rendererRef.current) return;

      const mode = modes[uiState.mode.type];
      const modeFunction = getModeFunction(mode, e);

      if (!modeFunction) return;

      const nextMouse = getMouse({
        interactiveElement: rendererRef.current,
        zoom: uiState.zoom,
        scroll: uiState.scroll,
        lastMouse: uiState.mouse,
        mouseEvent: e,
        rendererSize
      });

      uiState.actions.setMouse(nextMouse);

      const baseState: State = {
        model,
        scene,
        uiState,
        rendererRef: rendererRef.current,
        rendererSize,
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
    [model, scene, uiState, rendererSize]
  );

  const onContextMenu = useCallback(
    (e: SlimMouseEvent) => {
      e.preventDefault();

      const itemAtTile = getItemAtTile({
        tile: uiState.mouse.position.tile,
        scene
      });

      if (itemAtTile?.type === 'RECTANGLE') {
        uiState.actions.setContextMenu({
          item: itemAtTile,
          tile: uiState.mouse.position.tile
        });
      } else if (uiState.contextMenu) {
        uiState.actions.setContextMenu(null);
      }
    },
    [uiState.mouse, scene, uiState.contextMenu, uiState.actions]
  );

  useEffect(() => {
    if (uiState.mode.type === 'INTERACTIONS_DISABLED') return;

    const el = window;

    const onTouchStart = (e: TouchEvent) => {
      onMouseEvent({
        ...e,
        clientX: Math.floor(e.touches[0].clientX),
        clientY: Math.floor(e.touches[0].clientY),
        type: 'mousedown'
      });
    };

    const onTouchMove = (e: TouchEvent) => {
      onMouseEvent({
        ...e,
        clientX: Math.floor(e.touches[0].clientX),
        clientY: Math.floor(e.touches[0].clientY),
        type: 'mousemove'
      });
    };

    const onTouchEnd = (e: TouchEvent) => {
      onMouseEvent({
        ...e,
        clientX: 0,
        clientY: 0,
        type: 'mouseup'
      });
    };

    el.addEventListener('mousemove', onMouseEvent);
    el.addEventListener('mousedown', onMouseEvent);
    el.addEventListener('mouseup', onMouseEvent);
    el.addEventListener('contextmenu', onContextMenu);
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('mousemove', onMouseEvent);
      el.removeEventListener('mousedown', onMouseEvent);
      el.removeEventListener('mouseup', onMouseEvent);
      el.removeEventListener('contextmenu', onContextMenu);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [uiState.editorMode, onMouseEvent, uiState.mode.type, onContextMenu]);

  const setInteractionsElement = useCallback((element: HTMLElement) => {
    rendererRef.current = element;
  }, []);

  return {
    setInteractionsElement
  };
};
