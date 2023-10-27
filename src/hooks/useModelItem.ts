import { useMemo } from 'react';
import { ModelItem } from 'src/types';
import { useModelStore } from 'src/stores/modelStore';
import { getItemByIdOrThrow } from 'src/utils';

export const useModelItem = (id: string): ModelItem => {
  const model = useModelStore((state) => {
    return state;
  });

  const modelItem = useMemo(() => {
    return getItemByIdOrThrow(model.items, id).value;
  }, [id, model.items]);

  return modelItem;
};
