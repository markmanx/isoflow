import { useEffect } from 'react';
import { Connector as ConnectorInterface } from 'src/stores/useSceneStore';
import { useConnector } from './useConnector';

interface ConnectorProps {
  connector: ConnectorInterface;
  parentContainer: paper.Group;
}

export const Connector = ({ parentContainer, connector }: ConnectorProps) => {
  const { init } = useConnector();

  useEffect(() => {
    const container = init();

    parentContainer.addChild(container);
  }, [parentContainer, init]);

  return null;
};
