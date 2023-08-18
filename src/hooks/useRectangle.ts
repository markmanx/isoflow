import { useMemo } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { getItemById } from 'src/utils';

export const useRectangle = (id: string) => {
  const rectangles = useSceneStore((state) => {
    return state.rectangles;
  });

  const node = useMemo(() => {
    return getItemById(rectangles, id).item;
  }, [rectangles, id]);

  return node;
};
