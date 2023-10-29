import { useMemo } from 'react';
import { getItemByIdOrThrow } from 'src/utils';
import { useScene } from 'src/hooks/useScene';

export const useColor = (colorId: string) => {
  const { colors } = useScene();

  const color = useMemo(() => {
    return getItemByIdOrThrow(colors, colorId).value;
  }, [colorId, colors]);

  return color;
};
