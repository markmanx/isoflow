import { useMemo } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';

export const useNode = (nodeId: string) => {
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });

  const node = useMemo(() => {
    return nodes.find((n) => {
      return n.id === nodeId;
    });
  }, [nodes, nodeId]);

  return node;
};
