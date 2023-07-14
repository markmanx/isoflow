import {
  useCallback, useRef,
} from 'react';
import { Group } from 'paper';
import { NodeI } from '../../validation/SceneSchema';
import { useAppState } from './useAppState';

export const useNodeManager = () => {
  const container = useRef<paper.Group>();
  const setNodes = useAppState((state) => state.setNodes);

  const createNode = useCallback(
    (node: NodeI) => {
      setNodes((oldNodes) => [...oldNodes, node]);
    },
    [setNodes],
  );

  const updateNode = useCallback(
    (id: string, updates: NodeI) => {
      setNodes((oldNodes) => {
        const nodeIndex = oldNodes.findIndex((node) => node.id === id);

        if (nodeIndex === -1) return oldNodes;

        const newNodes = [...oldNodes];
        const nodeToUpdate = { ...newNodes[nodeIndex], ...updates };
        newNodes[nodeIndex] = nodeToUpdate;

        return newNodes;
      });
    },
    [setNodes],
  );

  const init = useCallback(() => {
    container.current = new Group();

    return container.current;
  }, []);

  const destroy = useCallback(() => {
    // container.current?.remove();
    // setNodes(() => []);`
  }, []);

  return {
    init,
    createNode,
    updateNode,
    container: container.current,
    destroy,
  };
};
