import { useCallback, useEffect, useRef } from 'react';
import { produce } from 'immer';
import { Tool } from 'paper';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { getTileFromMouse } from 'src/renderer/utils/gridHelpers';
import { toolEventToMouseEvent } from './utils';
import { Select } from './reducers/Select';
import { DragItems } from './reducers/DragItems';
import { Pan } from './reducers/Pan';
import { Cursor } from './reducers/Cursor';
import type { InteractionReducer, InteractionReducerAction } from './types';

const reducers: {
  [key in 'SELECT' | 'PAN' | 'DRAG_ITEMS' | 'CURSOR']: InteractionReducer;
} = {
  CURSOR: Cursor,
  SELECT: Select,
  DRAG_ITEMS: DragItems,
  PAN: Pan
};

export const useInteractionManager = () => {
  const tool = useRef<paper.Tool>();
  const mode = useUiStateStore((state) => state.mode);
  const mouse = useUiStateStore((state) => state.mouse);
  const scroll = useUiStateStore((state) => state.scroll);
  const scene = useSceneStore(({ nodes }) => ({ nodes }));
  const uiStateActions = useUiStateStore((state) => state.actions);
  const gridSize = useSceneStore((state) => state.gridSize);
  const sceneActions = useSceneStore((state) => state.actions);

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

      // Update mouse position
      const newMouse = toolEventToMouseEvent({ toolEvent, mouse });
      uiStateActions.setMouse(newMouse);

      // Detect when a new tile is hovered over, and use it to trigger an `onTileOver`
      // function on the reducer.  This is a common occurence for triggering events like moving
      // the cursor from one tile to the next
      const prevTile = getTileFromMouse({
        mousePosition: mouse.position,
        gridSize,
        scroll
      });
      const tile = getTileFromMouse({
        mousePosition: newMouse.position,
        gridSize,
        scroll
      });

      if (!prevTile.isEqual(tile)) {
        reducerAction = reducer.onTileOver;
      }

      const newState = produce(
        {
          scene,
          mouse,
          mode,
          scroll,
          gridSize
        },
        (draft) => reducerAction(draft, { tile })
      );

      uiStateActions.setScroll(newState.scroll);
      uiStateActions.setMode(newState.mode);
      sceneActions.setItems(newState.scene);
    },
    [mode, mouse, scroll, gridSize, uiStateActions, sceneActions, scene]
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
};
