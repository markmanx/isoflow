import { useCallback, useRef } from 'react';
import { Group } from 'paper';
import { NodeSchemaI } from '../../validation/SceneSchema';
import { useAppState } from './useAppState';

export const useNodeManager = () => {
  const container = useRef(new Group());
  const setNodes = useAppState((state) => state.setNodes);

  const createNode = useCallback(
    (node: NodeSchemaI) => {
      setNodes((oldNodes) => [...oldNodes, node]);
    },
    [setNodes]
  );

  const updateNode = useCallback(
    (id: string, updates: NodeSchemaI) => {
      setNodes((oldNodes) => {
        const NodeSchemaIndex = oldNodes.findIndex((node) => node.id === id);

        if (NodeSchemaIndex === -1) return oldNodes;

        const newNodes = [...oldNodes];
        const nodeToUpdate = { ...newNodes[NodeSchemaIndex], ...updates };
        newNodes[NodeSchemaIndex] = nodeToUpdate;

        return newNodes;
      });
    },
    [setNodes]
  );

  const destroy = useCallback(() => {
    // container.current?.remove();
    // setNodes(() => []);`
  }, []);

  return {
    createNode,
    updateNode,
    container: container.current,
    destroy
  };
};
