import { useCallback } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useModelStore } from 'src/stores/modelStore';
import { useSceneStore } from 'src/stores/sceneStore';
import { syncScene } from 'src/stores/reducers';
import { Model } from 'src/types';

export const useView = () => {
  const modelActions = useModelStore((state) => {
    return state.actions;
  });

  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const sceneActions = useSceneStore((state) => {
    return state.actions;
  });

  const changeView = useCallback(
    (viewId: string, model: Model) => {
      const newState = syncScene(viewId, model);
      sceneActions.set(newState.scene);
      modelActions.set(newState.model);
      uiStateActions.setView(viewId);
    },
    [uiStateActions, sceneActions, modelActions]
  );

  return {
    changeView
  };
};
