import { useCallback, useState, useRef } from 'react';
import { InitialData, IconCollectionState } from 'src/types';
import { INITIAL_DATA, VIEW_DEFAULTS } from 'src/config';
import {
  generateId,
  getFitToViewParams,
  CoordsUtils,
  categoriseIcons
} from 'src/utils';
import { createView } from 'src/stores/reducers';
import { useModelStore } from 'src/stores/modelStore';
import { useView } from 'src/hooks/useView';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { modelSchema } from 'src/schemas/model';

export const useInitialDataManager = () => {
  const [isReady, setIsReady] = useState(false);
  const prevInitialData = useRef<InitialData>();
  const model = useModelStore((state) => {
    return state;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });
  const rendererEl = useUiStateStore((state) => {
    return state.rendererEl;
  });
  const { changeView } = useView();

  const load = useCallback(
    (_initialData: InitialData) => {
      if (!_initialData || prevInitialData.current === _initialData) return;

      setIsReady(false);

      const validationResult = modelSchema.safeParse(_initialData);

      if (!validationResult.success) {
        window.alert('There is an error in your model.');
        return;
      }

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
      changeView(initialData.view ?? initialData.views[0].id, initialData);

      if (initialData.fitToView) {
        const rendererSize = rendererEl?.getBoundingClientRect();

        const { zoom, scroll } = getFitToViewParams(initialData.views[0], {
          width: rendererSize?.width ?? 0,
          height: rendererSize?.height ?? 0
        });

        uiStateActions.setScroll({
          position: scroll,
          offset: CoordsUtils.zero()
        });
        uiStateActions.setZoom(zoom);
      }

      const categoriesState: IconCollectionState[] = categoriseIcons(
        initialData.icons
      ).map((collection) => {
        return {
          id: collection.name,
          isExpanded: false
        };
      });

      uiStateActions.setIconCategoriesState(categoriesState);

      setIsReady(true);
    },
    [changeView, model.actions, rendererEl, uiStateActions]
  );

  const clear = useCallback(() => {
    load({ ...INITIAL_DATA, icons: model.icons, colors: model.colors });
    uiStateActions.resetUiState();
  }, [load, model.icons, model.colors, uiStateActions]);

  return {
    load,
    clear,
    isReady
  };
};
