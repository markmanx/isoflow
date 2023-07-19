import React, { useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import App from './App';
import { mockScene } from './mockData';
import { OnSceneChange } from './types';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const DataLayer = () => {
  const onSceneChange = useCallback<OnSceneChange>(() => {}, []);

  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0
          }
        }}
      />
      <App
        initialScene={mockScene}
        onSceneChange={onSceneChange}
        height="100vh"
      />
    </>
  );
};

root.render(
  <React.StrictMode>
    <DataLayer />
  </React.StrictMode>
);
