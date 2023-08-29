import { setWindowCursor } from 'src/utils';
import { ModeActions } from 'src/types';

export const TextBox: ModeActions = {
  entry: () => {
    setWindowCursor('crosshair');
  },
  exit: () => {
    setWindowCursor('default');
  },
  mousemove: () => {},
  mousedown: () => {},
  mouseup: () => {}
};
