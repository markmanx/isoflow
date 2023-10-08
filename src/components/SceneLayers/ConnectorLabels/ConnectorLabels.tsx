import React from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { ConnectorLabel } from './ConnectorLabel';

export const ConnectorLabels = () => {
  const connectors = useSceneStore((state) => {
    return state.connectors;
  });

  return (
    <>
      {connectors
        .filter((con) => {
          return con.label !== undefined;
        })
        .map((connector) => {
          return <ConnectorLabel key={connector.id} connector={connector} />;
        })}
    </>
  );
};
