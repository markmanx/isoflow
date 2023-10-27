import { useMemo } from 'react';
import { getItemByIdOrThrow } from 'src/utils';
import { useScene } from 'src/hooks/useScene';

export const useTextBox = (id: string) => {
  const { textBoxes } = useScene();

  const textBox = useMemo(() => {
    return getItemByIdOrThrow(textBoxes, id).value;
  }, [textBoxes, id]);

  return textBox;
};
