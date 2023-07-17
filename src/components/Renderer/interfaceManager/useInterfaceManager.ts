import { useCallback, useEffect, useRef } from 'react';
import { produce, Draft } from 'immer';
import { Tool } from 'paper';
import { Coords } from '../../../utils/Coords';
import {
  useScroll,
  useScrollActions,
  Scroll
} from '../../../stores/useScrollStore';
import { useMode } from '../../../stores/useModeStore';
import {
  useMouse,
  useMouseActions,
  Mouse
} from '../../../stores/useMouseStore';
import { useGridSize } from '../../../stores/useSceneStore';

export interface State {
  mouse: Mouse;
  scroll: Scroll;
  gridSize: Coords;
}

export type MouseReducerAction = (state: Draft<State>, payload: Mouse) => void;

export interface MouseReducer {
  mousemove: MouseReducerAction;
  mousedown: MouseReducerAction;
  mouseup: MouseReducerAction;
}

const reducers: {
  [key in 'SELECT' | 'PAN']: MouseReducer;
} = {
  SELECT: {
    mousemove: (state, mouse) => {
      state.mouse = mouse;
    },
    mousedown: (state, mouse) => {
      state.mouse = mouse;
      state.mouse.dragStart = mouse.position;
    },
    mouseup: (state, mouse) => {
      state.mouse = mouse;
      state.mouse.dragStart = null;
    }
  },
  PAN: {
    mousemove: (state, mouse) => {
      state.mouse = mouse;

      if (state.mouse.dragStart === null) return;

      state.scroll.position = mouse.delta
        ? state.scroll.position.add(mouse.delta)
        : state.scroll.position;
    },
    mousedown: (state, mouse) => {
      state.mouse = mouse;
      state.mouse.dragStart = mouse.position;
    },
    mouseup: (state, mouse) => {
      state.mouse = mouse;
      state.mouse.dragStart = null;
    }
  }
};

const parseToolEvent = (toolEvent: paper.ToolEvent, mouse: Mouse) => {
  const position = new Coords(toolEvent.point.x, toolEvent.point.y);

  let dragStart;

  switch (toolEvent.type) {
    case 'mousedown':
      dragStart = position;
      break;
    case 'mouseup':
      dragStart = null;
      break;
    default:
      dragStart = mouse.dragStart;
      break;
  }

  let delta: Coords | null = position.subtract(mouse.position);

  if (delta.x === 0 && delta.y === 0) delta = null;

  return {
    position,
    dragStart,
    delta
  };
};

export const useInterfaceManager = () => {
  const tool = useRef<paper.Tool>();
  const mode = useMode();
  // const modeActions = useModeActions();
  const gridSize = useGridSize();
  const mouse = useMouse();
  const mouseActions = useMouseActions();
  // const cursor = useAppState((state) => state.cursor);
  // const setCursor = useAppState((state) => state.setCursor);
  // const gridSize = useAppState((state) => state.gridSize);
  const scroll = useScroll();
  const scrollActions = useScrollActions();

  const onMouseEvent = useCallback(
    (toolEvent: paper.ToolEvent) => {
      const reducer = reducers[mode.type];

      let reducerAction: MouseReducerAction;

      switch (toolEvent.type) {
        case 'mousedown':
          reducerAction = reducer.mousedown;
          break;
        case 'mousemove':
          reducerAction = reducer.mousemove;
          break;
        case 'mouseup':
          reducerAction = reducer.mouseup;
          break;
        default:
          return;
      }

      const newMouse = parseToolEvent(toolEvent, mouse);
      const newState = produce({ mouse, scroll, gridSize }, (draft) =>
        reducerAction(draft, newMouse)
      );

      mouseActions.set(newState.mouse);
      scrollActions.setPosition(newState.scroll.position);
    },
    [
      mode,
      mouse,
      mouseActions.set,
      scroll,
      scrollActions.setPosition,
      parseToolEvent,
      gridSize
    ]
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
