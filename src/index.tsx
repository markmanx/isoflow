import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import Isoflow, { useIsoflow, SceneInput } from './App';
import { mockScene } from './mockData';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const DataLayer = () => {
  const { updateNode } = useIsoflow();

  const onSceneUpdated = useCallback((scene: SceneInput) => {
    console.log(scene);
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
        initialScene={mockScene}
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
