import { useCallback, useRef, useState } from "react";
import { Group } from "paper";
import { NodeProps } from "./Node";

type Node = Omit<NodeProps, "parentContainer">;

export const useNodeManager = () => {
  const container = useRef<paper.Group>(new Group());
  const [nodes, setNodes] = useState<Node[]>([]);

  const createNode = useCallback((node: Node) => {
    setNodes((prev) => [...prev, node]);
  }, []);

  const removeNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id));
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<Node>) => {
    setNodes((prev) => {
      const nodeIndex = prev.findIndex((node) => node.id === id);

      if (nodeIndex === -1) return prev;

      const newNodes = [...prev];
      const nodeToUpdate = { ...newNodes[nodeIndex], ...updates };
      newNodes[nodeIndex] = nodeToUpdate;

      return newNodes;
    });
  }, []);

  return {
    nodes,
    setNodes,
    createNode,
    removeNode,
    updateNode,
    container: container.current,
  };
};
