import { Size } from 'src/types';
import { customVars } from './styles/theme';

export const TILE_SIZE = 100;
export const PROJECTED_TILE_DIMENSIONS: Size = {
  width: TILE_SIZE * 1.415,
  height: TILE_SIZE * 0.819
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
