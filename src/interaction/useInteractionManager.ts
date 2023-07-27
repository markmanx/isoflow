import { useCallback, useEffect, useRef } from 'react';
import { produce } from 'immer';
import { Tool } from 'paper';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useUiStateStore } from 'src/stores/useUiStateStore';
import { toolEventToMouseEvent } from './utils';
import { DragItems } from './reducers/DragItems';
import { Pan } from './reducers/Pan';
import { Cursor } from './reducers/Cursor';
import { Lasso } from './reducers/Lasso';
import type { InteractionReducer } from './types';

const reducers: { [k in string]: InteractionReducer } = {
  CURSOR: Cursor,
  DRAG_ITEMS: DragItems,
  PAN: Pan,
  LASSO: Lasso
};

export const useInteractionManager = () => {
  const tool = useRef<paper.Tool>();
  const mode = useUiStateStore((state) => {
    return state.mode;
  });
  const scroll = useUiStateStore((state) => {
    return state.scroll;
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
  const scene = useSceneStore(({ nodes, connectors, groups }) => {
    return { nodes, connectors, groups };
  });
  const gridSize = useSceneStore((state) => {
    return state.gridSize;
  });
  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });

  const onMouseEvent = useCallback(
    (
      eventType: 'mousedown' | 'mousemove' | 'mouseup',
      toolEvent: paper.ToolEvent
    ) => {
      const reducer = reducers[mode.type];

      if (!reducer) return;

      const reducerAction = reducer[eventType];

      const nextMouse = toolEventToMouseEvent({
        toolEvent,
        gridSize,
        scroll,
        prevMouse: mouse
      });

      const newState = produce(
        {
          scene,
          mouse: nextMouse,
          mode,
          scroll,
          gridSize,
          contextMenu,
          itemControls
        },
        (draft) => {
          return reducerAction(draft);
        }
      );

      uiStateActions.setMouse(nextMouse);
      uiStateActions.setScroll(newState.scroll);
      uiStateActions.setMode(newState.mode);
      uiStateActions.setContextMenu(newState.contextMenu);
      uiStateActions.setSidebar(newState.itemControls);
      sceneActions.setItems(newState.scene);
    },
    [
      mode,
      scroll,
      mouse,
      gridSize,
      itemControls,
      uiStateActions,
      sceneActions,
      scene,
      contextMenu
    ]
  );

  useEffect(() => {
    tool.current = new Tool();
    tool.current.onMouseMove = (ev: paper.ToolEvent) => {
      return onMouseEvent('mousemove', ev);
    };
    tool.current.onMouseDown = (ev: paper.ToolEvent) => {
      return onMouseEvent('mousedown', ev);
    };
    tool.current.onMouseUp = (ev: paper.ToolEvent) => {
      return onMouseEvent('mouseup', ev);
    };

    return () => {
      tool.current?.remove();
    };
  }, [onMouseEvent]);
};
