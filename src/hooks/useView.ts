import { useCallback } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useSceneStore } from 'src/stores/sceneStore';
import { syncScene } from 'src/stores/reducers';
import { Model } from 'src/types';

export const useView = () => {
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
      uiStateActions.setView(viewId);
    },
    [uiStateActions, sceneActions]
  );

  return {
    changeView
  };
};
