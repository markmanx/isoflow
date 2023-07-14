import type { Mode } from './useInterfaceManager';

export const Select = (): Mode => {
  const entry = () => {
    console.log('ENTRY');
  };

  const exit = () => {
    console.log('EXIT');
  };

  const MOUSE_MOVE = () => {
    console.log('yo');
  };

  return {
    entry,
    exit,
    MOUSE_MOVE,
    name: 'SELECT',
  };
};
