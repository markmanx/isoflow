import { useCallback, useEffect, useRef } from 'react';
import { produce, Draft } from 'immer';
import { Tool } from 'paper';
import { Coords } from '../../../utils/Coords';
import {
  useScroll,
  useScrollActions,
  Scroll
} from '../../../stores/useScrollStore';
import { useMode, useModeActions, Mode } from '../../../stores/useModeStore';
import {
  useMouse,
  useMouseActions,
  Mouse
} from '../../../stores/useMouseStore';
import {
  useScene,
  useSceneActions,
  useGridSize
} from '../../../stores/useSceneStore';
import { SceneI } from '../../../validation/SceneSchema';
import { Select, DragItems, Pan } from './reducers';
import { getTileFromMouse } from '../utils/gridHelpers';

export interface State {
  mouse: Mouse;
  mode: Mode;
  scroll: Scroll;
  gridSize: Coords;
  scene: SceneI;
}

type InteractionReducerAction = (
  state: Draft<State>,
  payload: { tile: Coords }
) => void;

export type InteractionReducer = {
  mousemove: InteractionReducerAction;
  mousedown: InteractionReducerAction;
  mouseup: InteractionReducerAction;
};

const reducers: {
  [key in 'SELECT' | 'PAN' | 'DRAG_ITEMS']: InteractionReducer;
} = {
  SELECT: Select,
  DRAG_ITEMS: DragItems,
  PAN: Pan
};

const parseToolEvent = (toolEvent: paper.ToolEvent, mouse: Mouse) => {
  const position = new Coords(toolEvent.point.x, toolEvent.point.y);

  let mouseDownAt: Mouse['mouseDownAt'];

  switch (toolEvent.type) {
    case 'mousedown':
      mouseDownAt = position;
      break;
    case 'mouseup':
      mouseDownAt = null;
      break;
    default:
      mouseDownAt = mouse.mouseDownAt;
      break;
  }

  let delta: Coords | null = position.subtract(mouse.position);

  if (delta.x === 0 && delta.y === 0) delta = null;

  return {
    position,
    mouseDownAt,
    delta
  };
};

export const useInteractionManager = () => {
  const tool = useRef<paper.Tool>();
  const mode = useMode();
  const modeActions = useModeActions();
  const gridSize = useGridSize();
  const mouse = useMouse();
  const mouseActions = useMouseActions();
  // const cursor = useAppState((state) => state.cursor);
  // const setCursor = useAppState((state) => state.setCursor);
  // const gridSize = useAppState((state) => state.gridSize);
  const scroll = useScroll();
  const scrollActions = useScrollActions();
  const scene = useScene();
  const sceneActions = useSceneActions();

  const onMouseEvent = useCallback(
    (toolEvent: paper.ToolEvent) => {
      const reducer = reducers[mode.type];
      let reducerAction: InteractionReducerAction;

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
      const tile = getTileFromMouse({
        mouse: newMouse.position,
        gridSize,
        scroll: scroll.position
      });

      const newState = produce(
        { mouse: newMouse, scroll, gridSize, scene, mode },
        (draft) => reducerAction(draft, { tile })
      );

      scrollActions.setPosition(newState.scroll.position);
      mouseActions.set(newMouse);
      modeActions.set(newState.mode);
      sceneActions.set(newState.scene);
    },
    [
      mode,
      mouse,
      mouseActions.set,
      scroll,
      scrollActions.setPosition,
      parseToolEvent,
      gridSize,
      scene
    ]
  );

  useEffect(() => {
    tool.current = new Tool();
    tool.current.onMouseMove = onMouseEvent;
    tool.current.onMouseDown = onMouseEvent;
    tool.current.onMouseUp = onMouseEvent;
    // tool.current.onKeyDown = onMouseEvent;
    // tool.current.onKeyUp = onMouseEvent;

    return () => {
      tool.current?.remove();
    };
  }, [onMouseEvent]);

  return {};
};
