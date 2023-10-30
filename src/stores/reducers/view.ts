import { produce } from 'immer';
import { View } from 'src/types';
import { getItemByIdOrThrow } from 'src/utils';
import { State } from './types';
import { syncConnector } from './connector';
import { syncTextBox } from './textBox';

export const syncScene = (viewId: string, model: State['model']) => {
  const view = getItemByIdOrThrow(model.views, viewId);

  const startingState: State = {
    model,
    scene: {
      connectors: {},
      textBoxes: {}
    }
  };

  const stateAfterConnectorsSynced = [
    ...(view.value.connectors ?? [])
  ].reduce<State>((acc, connector) => {
    return syncConnector(connector.id, viewId, acc);
  }, startingState);

  const stateAfterTextBoxesSynced = [
    ...(view.value.textBoxes ?? [])
  ].reduce<State>((acc, textBox) => {
    return syncTextBox(textBox.id, viewId, acc);
  }, stateAfterConnectorsSynced);

  return stateAfterTextBoxesSynced;
};

export const createView = (
  newView: View,
  model: State['model']
): State['model'] => {
  return produce(model, (draft) => {
    draft.views.push(newView);
  });
};
