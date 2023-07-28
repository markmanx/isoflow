// This is a development entry point for the app.
// It is not used in production or included in the build.
import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import type {
  SceneInput,
  NodeInput,
  ConnectorInput,
  IconInput,
  GroupInput
} from 'src/validation/SceneInput';
import Isoflow, { useIsoflow } from './App';

const icons: IconInput[] = [
  {
    id: 'block',
    name: 'Block',
    url: 'https://isoflow.io/static/assets/icons/networking/primitive.svg',
    category: 'Networking'
  },
  {
    id: 'server',
    name: 'Server',
    url: 'https://isoflow.io/static/assets/icons/networking/server.svg',
    category: 'Networking'
  }
];

const connectors: ConnectorInput[] = [
  {
    id: 'Connector1',
    label: 'Connector 1',
    from: 'Node1',
    to: 'Node2'
  }
];

const groups: GroupInput[] = [
  {
    id: 'Group1',
    label: 'Group 1',
    nodeIds: ['Node1', 'Node2']
  }
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const DataLayer = () => {
  const { updateNode } = useIsoflow();

  const onSceneUpdated = useCallback((scene: SceneInput) => {
    // console.log(scene);
  }, []);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     updateNode('Node1', { label: Date.now().toString() });
  //   }, 1000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [updateNode]);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0
          }
        }}
      />
      <Isoflow
        initialScene={{
          icons,
          nodes: [
            {
              id: 'Node1',
              labelElement: <>Node</>,
              iconId: 'block',
              position: {
                x: 0,
                y: 0
              }
            },
            {
              id: 'Node2',
              label: 'Node 2',
              iconId: 'server',
              position: {
                x: 3,
                y: 0
              }
            }
          ],
          connectors,
          groups,
          gridSize: {
            width: 51,
            height: 51
          }
        }}
        height="100vh"
        onSceneUpdated={onSceneUpdated}
      />
    </>
  );
};

root.render(
  <React.StrictMode>
    <DataLayer />
  </React.StrictMode>
);
