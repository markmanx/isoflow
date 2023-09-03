import { useState, useMemo } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { Icon } from 'src/types';

export const useIconFiltering = () => {
  const [filter, setFilter] = useState<string>('');

  const icons = useSceneStore((state) => {
    return state.icons;
  });

  const filteredIcons = useMemo(() => {
    const regex = new RegExp(filter, 'gi');

    return icons.filter((icon: Icon) => {
      if (!filter) {
        return true;
      }

      return regex.test(icon.name);
    });
  }, [icons, filter]);

  return {
    setFilter,
    filter,
    icons: filteredIcons
  };
};
