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
    height: 55
  },
  diagramPalette: {
    green: '#53b435',
    blue: '#4a82f7',
    teal: '#5a9f9f',
    salmon: '#e08079',
    orange: '#e58b48',
    white: '#ffffff',
    pink: '#e1034c',
    purple: '#5155ad',
    lightPurple: '#8441fc',
    lightBlue: '#f4f6fe',
    yellow: '#ffdc73',
    red: '#d62727'
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
