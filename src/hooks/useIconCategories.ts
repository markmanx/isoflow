import { useMemo, useCallback } from 'react';
import { IconCollectionStateWithIcons, IconCollectionState } from 'src/types';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { useSceneStore } from 'src/stores/sceneStore';
import { categoriseIcons } from 'src/utils';

export const useIconCategories = () => {
  const icons = useSceneStore((state) => {
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
