import { Size } from 'src/types';
import { customVars } from './styles/theme';

export const UNPROJECTED_TILE_SIZE = 100;
export const TILE_PROJECTION_MULTIPLIERS: Size = {
  width: 1.415,
  height: 0.819
};
export const DEFAULT_COLOR = customVars.diagramPalette.blue;
export const CONNECTOR_DEFAULTS = {
  width: 4
};
export const NODE_DEFAULTS = {
  label: '',
  labelHeight: 100,
  color: DEFAULT_COLOR
};
