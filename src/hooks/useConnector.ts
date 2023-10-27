import { useMemo } from 'react';
import { Connector, SceneConnector } from 'src/types';
import { CONNECTOR_DEFAULTS } from 'src/config';
import { getItemByIdOrThrow } from 'src/utils';
import { useScene } from 'src/hooks/useScene';

export const useConnector = (
  id: string
): Required<Connector> & SceneConnector => {
  const { connectors } = useScene();

  const connector = useMemo(() => {
    const con = getItemByIdOrThrow(connectors ?? [], id).value;

    return {
      ...CONNECTOR_DEFAULTS,
      ...con
    };
  }, [connectors, id]);

  return connector;
};
