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

export interface MouseReducer {
  mousemove: (state: Draft<State>, payload: Mouse) => void;
}

const reducers: {
  [key in 'SELECT' | 'PAN']: MouseReducer;
} = {
  SELECT: {
    mousemove: (state, payload) => {
      state.mouse = payload;
    }
  },
  PAN: {
    mousemove: (state, payload) => {
      state.mouse = payload;
      state.scroll.position = payload.delta
        ? state.scroll.position.subtract(payload.delta)
        : state.scroll.position;
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
      const newMouse = parseToolEvent(toolEvent, mouse);

      mouseActions.set(newMouse);

      const reducer = reducers[mode.type];
      const newState = produce({ mouse, scroll, gridSize }, (draft) =>
        reducer.mousemove(draft, newMouse)
      );

      mouseActions.set(newState.mouse);
      scrollActions.setPosition(newState.scroll.position);

      // if (!modeReducer) {
      //   throw new Error(`Could not activate mode: ${toolEvent.type}`);
      // }

      // modeReducer[toolEvent.type]?.({ mouse });
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
