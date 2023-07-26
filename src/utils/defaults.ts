// TODO: Rename to config.ts
import { customVars } from '../styles/theme';

export const DEFAULT_COLOR = customVars.diagramPalette.blue;

export const GRID_DEFAULTS = {
  size: {
    x: 51,
    y: 51
  }
};

export const NODE_DEFAULTS = {
  label: '',
  labelHeight: 100,
  color: DEFAULT_COLOR
};
