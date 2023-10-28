import { useMemo } from 'react';
import { Connector, SceneConnector } from 'src/types';
import { getItemByIdOrThrow } from 'src/utils';
import { useScene } from 'src/hooks/useScene';

export const useConnector = (
  id: string
): Required<Connector> & SceneConnector => {
  const { connectors } = useScene();

  const connector = useMemo(() => {
    return getItemByIdOrThrow(connectors, id).value;
  }, [connectors, id]);

  return connector;
};
