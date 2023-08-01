import { useEffect } from 'react';
import { Connector as ConnectorInterface } from 'src/types';
import { useSceneStore } from 'src/stores/useSceneStore';
import { useConnector } from './useConnector';

interface ConnectorProps {
  connector: ConnectorInterface;
  parentContainer: paper.Group;
}

export const Connector = ({ parentContainer, connector }: ConnectorProps) => {
  const { init, updateFromTo, updateColor } = useConnector();
  const nodes = useSceneStore((state) => {
    return state.nodes;
  });

  useEffect(() => {
    const container = init();

    parentContainer.addChild(container);
  }, [parentContainer, init]);

  useEffect(() => {
    updateColor(connector.color);
  }, [connector, updateColor]);

  useEffect(() => {
    const fromNode = nodes.find((node) => {
      return node.id === connector.from;
    });

    const toNode = nodes.find((node) => {
      return node.id === connector.to;
    });

    if (!fromNode || !toNode) return;

    updateFromTo({ x: 100, y: 100 }, fromNode.position, toNode.position);
  }, [nodes, connector, updateFromTo]);

  return null;
};
