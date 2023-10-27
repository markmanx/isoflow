import { useMemo } from 'react';
import { getItemByIdOrThrow } from 'src/utils';
import { useScene } from 'src/hooks/useScene';
import { RECTANGLE_DEFAULTS } from 'src/config';

export const useRectangle = (id: string) => {
  const { rectangles } = useScene();

  const rectangle = useMemo(() => {
    return getItemByIdOrThrow(rectangles, id).value;
  }, [rectangles, id]);

  return {
    ...RECTANGLE_DEFAULTS,
    ...rectangle
  };
};
