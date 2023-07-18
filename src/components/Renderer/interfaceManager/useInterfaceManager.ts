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
import { getTileFromMouse, getItemsFromTile } from '../utils/gridHelpers';
import { SceneI, NodeSchemaI } from '../../../validation/SceneSchema';

export interface State {
  mouse: Mouse;
  mode: Mode;
  scroll: Scroll;
  gridSize: Coords;
  scene: SceneI;
}

export type MouseReducerAction = (state: Draft<State>, payload: Mouse) => void;

export interface MouseReducer {
  mousemove: MouseReducerAction;
  mousedown: MouseReducerAction;
  mouseup: MouseReducerAction;
}

const reducers: {
  [key in 'SELECT' | 'PAN' | 'DRAG_ITEMS']: MouseReducer;
} = {
  SELECT: {
    mousemove: (state, mouse) => {
      state.mouse = mouse;
    },
    mousedown: (state, mouse) => {
      state.mouse.dragStart = mouse.position;

      const tile = getTileFromMouse({
        mouse: mouse.position,
        gridSize: state.gridSize,
        scroll: state.scroll.position
      });

      const tileItems = getItemsFromTile(tile, state.scene);

      if (tileItems.length > 0) {
        state.mode = { type: 'DRAG_ITEMS', nodes: tileItems };
      }
    },
    mouseup: (state, mouse) => {
      state.mouse = mouse;
      state.mouse.dragStart = null;
    }
  },
  DRAG_ITEMS: {
    mousemove: (state, mouse) => {
      if (state.mode.type !== 'DRAG_ITEMS') return;

      const tile = getTileFromMouse({
        mouse: mouse.position,
        gridSize: state.gridSize,
        scroll: state.scroll.position
      });

      state.mode.nodes.forEach((node) => {
        const sceneNodeIndex = state.scene.nodes.findIndex(
          (sceneNode) => sceneNode.id === node.id
        );

        if (sceneNodeIndex === -1) return;

        state.scene.nodes[sceneNodeIndex].position = tile;
      });

      state.mouse = mouse;
    },
    mousedown: (state, mouse) => {},
    mouseup: (state, mouse) => {
      state.mouse = mouse;
      state.mouse.dragStart = null;
      state.mode = { type: 'SELECT' };
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
      const newState = produce(
        { mouse, scroll, gridSize, scene, mode },
        (draft) => reducerAction(draft, newMouse)
      );

      mouseActions.set(newState.mouse);
      scrollActions.setPosition(newState.scroll.position);
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
    tool.current.onKeyDown = onMouseEvent;
    tool.current.onKeyUp = onMouseEvent;

    return () => {
      tool.current?.remove();
    };
  }, [onMouseEvent]);

  return {};
};
