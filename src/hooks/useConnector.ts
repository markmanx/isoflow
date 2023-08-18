import { useMemo } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { getItemById } from 'src/utils';

export const useConnector = (id: string) => {
  const connectors = useSceneStore((state) => {
    return state.connectors;
  });

  const node = useMemo(() => {
    return getItemById(connectors, id).item;
  }, [connectors, id]);

  return node;
};
