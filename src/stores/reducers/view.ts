import { produce } from 'immer';
import { View } from 'src/types';
import { State } from './types';

export const createView = (
  newView: View,
  model: State['model']
): State['model'] => {
  return produce(model, (draft) => {
    draft.views.push(newView);
  });
};
