import { useMemo } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { getItemById } from 'src/utils';

export const useNode = (id: string) => {
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });

  const node = useMemo(() => {
    return getItemById(nodes, id).item;
  }, [nodes, id]);

  return node;
};
