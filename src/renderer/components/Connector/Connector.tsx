import { useEffect } from 'react';
import {
  Connector as ConnectorInterface,
  useSceneStore
} from 'src/stores/useSceneStore';
import { useConnector } from './useConnector';

interface ConnectorProps {
  connector: ConnectorInterface;
  parentContainer: paper.Group;
}

export const Connector = ({ parentContainer, connector }: ConnectorProps) => {
  const { init, updateFromTo } = useConnector();
  const gridSize = useSceneStore((state) => {
    return state.gridSize;
  });
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });

  useEffect(() => {
    const container = init();

    parentContainer.addChild(container);
  }, [parentContainer, init]);

  useEffect(() => {
    const fromNode = nodes.find((node) => {
      return node.id === connector.from;
    });

    const toNode = nodes.find((node) => {
      return node.id === connector.to;
    });

    if (!fromNode || !toNode) return;

    updateFromTo(gridSize, fromNode.position, toNode.position);
  }, [gridSize, nodes, connector, updateFromTo]);

  return null;
};
