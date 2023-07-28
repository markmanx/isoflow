// This is a development entry point for the app.
// It is not used in production or included in the build.
import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider, createTheme } from '@mui/material';
import { Examples } from './examples';
import { themeConfig } from './styles/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyles
      styles={{
        body: {
          margin: 0
        }
      }}
    />
    <ThemeProvider theme={createTheme({ ...themeConfig, palette: undefined })}>
      <Examples />
    </ThemeProvider>
  </React.StrictMode>
);
