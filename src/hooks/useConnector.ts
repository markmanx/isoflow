import { useMemo } from 'react';
import { getItemByIdOrThrow } from 'src/utils';
import { useScene } from 'src/hooks/useScene';

export const useConnector = (id: string) => {
  const { connectors } = useScene();

  const connector = useMemo(() => {
    return getItemByIdOrThrow(connectors, id).value;
  }, [connectors, id]);

  return connector;
};
