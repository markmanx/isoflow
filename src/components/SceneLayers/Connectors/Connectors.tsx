import React from 'react';
import { useScene } from 'src/hooks/useScene';
import { Connector } from './Connector';

interface Props {
  connectors: ReturnType<typeof useScene>['connectors'];
}

export const Connectors = ({ connectors }: Props) => {
  return (
    <>
      {[...connectors].reverse().map((connector) => {
        return <Connector key={connector.id} connector={connector} />;
      })}
    </>
  );
};
