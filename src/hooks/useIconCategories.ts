import { useMemo, useCallback } from 'react';
import { IconCollectionStateWithIcons, IconCollectionState } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useModelStore } from 'src/stores/modelStore';
import { categoriseIcons } from 'src/utils';

export const useIconCategories = () => {
  const icons = useModelStore((state) => {
    return state.icons;
  });
  const iconCategoriesState = useUiStateStore((state) => {
    return state.iconCategoriesState;
  });
  const uiActions = useUiStateStore((state) => {
    return state.actions;
  });

  const setIconCategoriesState = useCallback(() => {
    const categoriesState: IconCollectionState[] = categoriseIcons(icons).map(
      (collection) => {
        return {
          id: collection.name,
          isExpanded: false
        };
      }
    );

    uiActions.setIconCategoriesState(categoriesState);
  }, [icons, uiActions]);

  const iconCategories = useMemo<IconCollectionStateWithIcons[]>(() => {
    return iconCategoriesState.map((collection) => {
      return {
        ...collection,
        icons: icons.filter((icon) => {
          return icon.collection === collection.id;
        })
      };
    });
  }, [icons, iconCategoriesState]);

  return {
    iconCategories,
    setIconCategoriesState
  };
};
