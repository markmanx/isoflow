import { useMemo } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { getItemById } from 'src/utils';

export const useTextBox = (id: string) => {
  const textBoxes = useSceneStore((state) => {
    return state.textBoxes;
  });

  const textBox = useMemo(() => {
    return getItemById(textBoxes, id).item;
  }, [textBoxes, id]);

  return textBox;
};
