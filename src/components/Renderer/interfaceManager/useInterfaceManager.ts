import { useCallback, useEffect, useRef } from 'react';
import { Tool } from 'paper';
import { useAppState, AppState } from '../useAppState';
import { Coords } from '../../../utils/Coords';
import { selectReducer } from './selectReducer';
import {
  useScrollPosition,
  useScrollActions
} from '../../../stores/useScrollStore';

export type PartialAppState = Pick<
  AppState,
  'mouse' | 'cursor' | 'scroll' | 'gridSize'
>;

const MOUSE_EVENTS = new Map([
  ['mousemove', 'MOUSE_MOVE'],
  ['mousedown', 'MOUSE_DOWN'],
  ['mouseup', 'MOUSE_UP'],
  ['mouseenter', 'MOUSE_ENTER'],
  ['mouseleave', 'MOUSE_LEAVE']
]);

export const useInterfaceManager = () => {
  const tool = useRef<paper.Tool>();
  const mouse = useAppState((state) => state.mouse);
  const setMouse = useAppState((state) => state.setMouse);
  const cursor = useAppState((state) => state.cursor);
  const setCursor = useAppState((state) => state.setCursor);
  const gridSize = useAppState((state) => state.gridSize);
  const scrollPosition = useScrollPosition();
  const scrollActions = useScrollActions();

  const onMouseEvent = useCallback(
    (event: paper.ToolEvent) => {
      const type = MOUSE_EVENTS.get(event.type);

      if (!type) return;

      const newMouse = {
        position: new Coords(event.point.x, event.point.y),
        delta: event.delta ? new Coords(event.delta.x, event.delta.y) : null
      };

      const newState = selectReducer(
        { type: 'MOUSE_MOVE', payload: { mouse: newMouse } },
        {
          mouse: {
            position: mouse.position.clone(),
            delta: mouse.delta?.clone() ?? null
          },
          cursor: {
            position: cursor.position.clone()
          },
          gridSize: gridSize.clone(),
          scroll: {
            position: scrollPosition.clone(),
            offset: scrollPosition.clone()
          }
        }
      );

      setMouse(newState.mouse);
      setCursor(newState.cursor);
      scrollActions.setPosition(newState.scroll);
    },
    [mouse, setMouse, cursor, setCursor, gridSize, scroll, setScroll]
  );

  useEffect(() => {
    tool.current = new Tool();
    tool.current.onMouseMove = onMouseEvent;
    tool.current.onMouseDown = onMouseEvent;
    tool.current.onMouseUp = onMouseEvent;
    tool.current.onKeyDown = onMouseEvent;
    tool.current.onKeyUp = onMouseEvent;

    return () => {
      tool.current?.remove();
    };
  }, [onMouseEvent]);

  return {};
};
