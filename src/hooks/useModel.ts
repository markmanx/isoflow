import { useCallback, useState, useRef } from 'react';
import { InitialData } from 'src/types';
import { INITIAL_DATA, VIEW_DEFAULTS } from 'src/config';
import { generateId } from 'src/utils';
import { createView } from 'src/stores/reducers';
import { useModelStore } from 'src/stores/modelStore';
import { useView } from 'src/hooks/useView';
import { useUiStateStore } from 'src/stores/uiStateStore';

export const useModel = () => {
  const [isReady, setIsReady] = useState(false);
  const prevInitialData = useRef<InitialData>();
  const model = useModelStore((state) => {
    return state;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const { changeView } = useView();

  const load = useCallback(
    (_initialData: InitialData) => {
      if (!_initialData || prevInitialData.current === _initialData) return;

      setIsReady(false);

      const initialData = _initialData;

      if (initialData.views.length === 0) {
        const updates = createView(
          {
            ...VIEW_DEFAULTS,
            id: generateId()
          },
          initialData
        );

        Object.assign(initialData, updates);
      }
      prevInitialData.current = initialData;
      model.actions.set(initialData);

      changeView(initialData.views[0].id, initialData);
      setIsReady(true);
    },
    [changeView, model.actions]
  );

  const clear = useCallback(() => {
    load({ ...INITIAL_DATA, icons: model.icons });
    uiStateActions.resetUiState();
  }, [load, model.icons, uiStateActions]);

  return {
    load,
    clear,
    isReady,
    ...model
  };
};
