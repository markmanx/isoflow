import { useMemo } from 'react';
import { getItemByIdOrThrow } from 'src/utils';
import { useScene } from 'src/hooks/useScene';

export const useViewItem = (id: string) => {
  const { items } = useScene();

  const viewItem = useMemo(() => {
    return getItemByIdOrThrow(items, id).value;
  }, [items, id]);

  return viewItem;
};
