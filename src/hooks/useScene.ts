import { useCallback, useMemo } from 'react';
import { ModelItem, ViewItem, Connector, TextBox, Rectangle } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useModelStore } from 'src/stores/modelStore';
import { useSceneStore } from 'src/stores/sceneStore';
import * as reducers from 'src/stores/reducers';
import type { State } from 'src/stores/reducers/types';
import { getItemByIdOrThrow } from 'src/utils';

export const useScene = () => {
  const model = useModelStore((state) => {
    return state;
  });

  const scene = useSceneStore((state) => {
    return state;
  });

  const currentViewId = useUiStateStore((state) => {
    return state.view;
  });

  const currentView = useMemo(() => {
    return getItemByIdOrThrow(model.views, currentViewId).value;
  }, [currentViewId, model.views]);

  const items = useMemo(() => {
    return currentView.items ?? [];
  }, [currentView.items]);

  const connectors = useMemo(() => {
    return (currentView.connectors ?? []).map((connector) => {
      const sceneConnector = scene.connectors[connector.id];

      return {
        ...connector,
        ...sceneConnector
      };
    });
  }, [currentView.connectors, scene.connectors]);

  const rectangles = useMemo(() => {
    return currentView.rectangles ?? [];
  }, [currentView.rectangles]);

  const textBoxes = useMemo(() => {
    return (currentView.textBoxes ?? []).map((textBox) => {
      const sceneTextBox = scene.textBoxes[textBox.id];

      return {
        ...textBox,
        ...sceneTextBox
      };
    });
  }, [currentView.textBoxes, scene.textBoxes]);

  const getState = useCallback(() => {
    return {
      model: model.actions.get(),
      scene: scene.actions.get()
    };
  }, [model.actions, scene.actions]);

  const setState = useCallback(
    (newState: State) => {
      model.actions.set(newState.model);
      scene.actions.set(newState.scene);
    },
    [model.actions, scene.actions]
  );

  const createModelItem = useCallback(
    (newModelItem: ModelItem) => {
      const newState = reducers.createModelItem(newModelItem, getState());
      setState(newState);
    },
    [getState, setState]
  );

  const updateModelItem = useCallback(
    (id: string, updates: Partial<ModelItem>) => {
      const newState = reducers.updateModelItem(id, updates, getState());
      setState(newState);
    },
    [getState, setState]
  );

  const deleteModelItem = useCallback(
    (id: string) => {
      const newState = reducers.deleteModelItem(id, getState());
      setState(newState);
    },
    [getState, setState]
  );

  const createViewItem = useCallback(
    (newViewItem: ViewItem) => {
      const newState = reducers.createViewItem(
        newViewItem,
        currentViewId,
        getState()
      );
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const updateViewItem = useCallback(
    (id: string, updates: Partial<ViewItem>) => {
      const newState = reducers.updateViewItem(
        id,
        updates,
        currentViewId,
        getState()
      );
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const deleteViewItem = useCallback(
    (id: string) => {
      const newState = reducers.deleteViewItem(id, currentViewId, getState());
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const createConnector = useCallback(
    (newConnector: Connector) => {
      const newState = reducers.createConnector(
        newConnector,
        currentViewId,
        getState()
      );
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const updateConnector = useCallback(
    (id: string, updates: Partial<Connector>) => {
      const newState = reducers.updateConnector(
        id,
        updates,
        currentViewId,
        getState()
      );
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const deleteConnector = useCallback(
    (id: string) => {
      const newState = reducers.deleteConnector(id, currentViewId, getState());
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const createTextBox = useCallback(
    (newTextBox: TextBox) => {
      const newState = reducers.createTextBox(
        newTextBox,
        currentViewId,
        getState()
      );
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const updateTextBox = useCallback(
    (id: string, updates: Partial<TextBox>) => {
      const newState = reducers.updateTextBox(
        id,
        updates,
        currentViewId,
        getState()
      );
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const deleteTextBox = useCallback(
    (id: string) => {
      const newState = reducers.deleteTextBox(id, currentViewId, getState());
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const createRectangle = useCallback(
    (newRectangle: Rectangle) => {
      const newState = reducers.createRectangle(
        newRectangle,
        currentViewId,
        getState()
      );

      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const updateRectangle = useCallback(
    (id: string, updates: Partial<Rectangle>) => {
      const newState = reducers.updateRectangle(
        id,
        updates,
        currentViewId,
        getState()
      );
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  const deleteRectangle = useCallback(
    (id: string) => {
      const newState = reducers.deleteRectangle(id, currentViewId, getState());
      setState(newState);
    },
    [getState, setState, currentViewId]
  );

  return {
    items,
    connectors,
    rectangles,
    textBoxes,
    currentView,
    createModelItem,
    updateModelItem,
    deleteModelItem,
    createViewItem,
    updateViewItem,
    deleteViewItem,
    createConnector,
    updateConnector,
    deleteConnector,
    createTextBox,
    updateTextBox,
    deleteTextBox,
    createRectangle,
    updateRectangle,
    deleteRectangle
  };
};
