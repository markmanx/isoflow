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
    h2: {
      fontSize: '4em',
      fontStyle: 'bold',
      lineHeight: 1.2
    },
    h5: {
      fontSize: '1.3em',
      lineHeight: 1.2
    },
    body1: {
      fontSize: '0.85em',
      lineHeight: 1.2
    },
    body2: {
      fontSize: '0.8em',
      lineHeight: 1.2
    }
  },
  palette: {
    secondary: {
      main: '#df004c'
    }
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
        variant: 'outlined'
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white'
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true
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
    MuiSvgIcon: {
      defaultProps: {
        color: 'primary'
      },
      styleOverrides: {
        root: {
          width: 17,
          height: 17
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard'
      },
      styleOverrides: {
        root: {
          '.MuiInputBase-input': {}
        }
      }
    }
  }
};

export const theme = createTheme(themeConfig);
