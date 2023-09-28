import { useMemo, useCallback } from 'react';
import { IconCategoryStateWithIcons, IconCategoryState } from 'src/types';
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
    const categoriesState: IconCategoryState[] = categoriseIcons(icons).map(
      (category) => {
        return {
          id: category.name,
          isExpanded: false
        };
      }
    );

    uiActions.setIconCategoriesState(categoriesState);
  }, [icons, uiActions]);

  const iconCategories = useMemo<IconCategoryStateWithIcons[]>(() => {
    return iconCategoriesState.map((category) => {
      return {
        ...category,
        icons: icons.filter((icon) => {
          return icon.category === category.id;
        })
      };
    });
  }, [icons, iconCategoriesState]);

  return {
    iconCategories,
    setIconCategoriesState
  };
};
