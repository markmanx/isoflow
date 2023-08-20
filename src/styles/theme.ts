import { createTheme, ThemeOptions } from '@mui/material';

interface CustomThemeVars {
  appPadding: {
    x: number;
    y: number;
  };
  toolMenu: {
    height: number;
  };
  diagramPalette: {
    [key in string]: string;
  };
}

declare module '@mui/material/styles' {
  interface Theme {
    customVars: CustomThemeVars;
  }

  interface ThemeOptions {
    customVars: CustomThemeVars;
  }
}

export const customVars: CustomThemeVars = {
  appPadding: {
    x: 40,
    y: 40
  },
  toolMenu: {
    height: 40
  },
  diagramPalette: {
    blue: '#a0b9f8',
    purple: '#bbadfb',
    yellow: '#f4eb8e',
    red: '#f0aca9',
    orange: '#fad6ac',
    green: '#a8dc9d',
    torquise: '#b3e5e3'
  }
};

export const themeConfig: ThemeOptions = {
  customVars,
  typography: {
    h5: {
      fontSize: '1.3rem',
      lineHeight: 1.2
    }
  },
  palette: {
    mode: 'dark',
    secondary: {
      main: '#df004c'
    }
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'contained',
        disableRipple: true,
        disableTouchRipple: true
      },
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard'
      }
    }
  }
};

export const theme = createTheme(themeConfig);
