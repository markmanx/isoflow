// This is a development entry point for the app.
// It is not used in production or included in the build.
import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import type {
  SceneInput,
  IconInput,
  GroupInput,
  NodeInput
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
    id: 'pyramid',
    name: 'Pyramid',
    url: 'https://isoflow.io/static/assets/icons/networking/pyramid.svg',
    category: 'Networking'
  },
  {
    id: 'sphere',
    name: 'Sphere',
    url: 'https://isoflow.io/static/assets/icons/networking/sphere.svg',
    category: 'Networking'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    url: 'https://isoflow.io/static/assets/icons/networking/diamond.svg',
    category: 'Networking'
  },
  {
    id: 'cube',
    name: 'Cube',
    url: 'https://isoflow.io/static/assets/icons/networking/cube.svg'
  },
  {
    id: 'pyramid',
    name: 'Pyramid',
    url: 'https://isoflow.io/static/assets/icons/networking/pyramid.svg',
    category: 'Generic'
  },
  {
    id: 'sphere',
    name: 'Sphere',
    url: 'https://isoflow.io/static/assets/icons/networking/sphere.svg',
    category: 'Generic'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    url: 'https://isoflow.io/static/assets/icons/networking/diamond.svg',
    category: 'Generic'
  }
];

const groups: GroupInput[] = [
  {
    id: 'Group1',
    label: 'Group 1',
    nodeIds: ['Node1', 'Node2']
  }
];

const nodes: NodeInput[] = [
  {
    id: 'Node1',
    label: 'Node 1',
    iconId: 'block',
    position: {
      x: 0,
      y: 0
    }
  },
  {
    id: 'Node2',
    label: 'Node 2',
    iconId: 'pyramid',
    position: {
      x: 3,
      y: 0
    }
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

  useEffect(() => {
    const timer = setInterval(() => {
      updateNode('Node1', { label: Date.now().toString() });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [updateNode]);

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
          nodes,
          connectors: [],
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
