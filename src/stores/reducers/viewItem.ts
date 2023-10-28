import { produce } from 'immer';
import { ViewItem } from 'src/types';
import { getItemByIdOrThrow, getConnectorsByViewItem } from 'src/utils';
import { validateView } from 'src/validation/utils';
import { State } from './types';
import { updateConnector, syncConnector } from './connector';

export const updateViewItem = (
  id: string,
  updates: Partial<ViewItem>,
  viewId: string,
  state: State
): State => {
  const newState = produce(state, (draft) => {
    const view = getItemByIdOrThrow(draft.model.views, viewId);
    const { items } = view.value;

    if (!items) return;

    const viewItem = getItemByIdOrThrow(items, id);
    const newItem = { ...viewItem.value, ...updates };
    items[viewItem.index] = newItem;

    if (updates.tile) {
      const connectorsToUpdate = getConnectorsByViewItem(
        viewItem.value.id,
        view.value.connectors ?? []
      );

      const updatedConnectors = connectorsToUpdate.reduce((acc, connector) => {
        return updateConnector(connector.id, connector, viewId, acc);
      }, draft);

      draft.model.views[view.index].connectors =
        updatedConnectors.model.views[view.index].connectors;

      draft.scene.connectors = updatedConnectors.scene.connectors;
    }
  });

  const newView = getItemByIdOrThrow(newState.model.views, viewId);
  const issues = validateView(newView.value, { model: newState.model });

  if (issues.length > 0) {
    throw new Error(issues[0].message);
  }

  return newState;
};

export const createViewItem = (
  newViewItem: ViewItem,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);

  const newState = produce(state, (draft) => {
    const { items } = draft.model.views[view.index];
    items.unshift(newViewItem);
  });

  return updateViewItem(newViewItem.id, newViewItem, viewId, newState);
};

export const deleteViewItem = (
  id: string,
  viewId: string,
  state: State
): State => {
  const newState = produce(state, (draft) => {
    const view = getItemByIdOrThrow(draft.model.views, viewId);
    const viewItem = getItemByIdOrThrow(view.value.items, id);

    draft.model.views[view.index].items.splice(viewItem.index, 1);

    const connectorsToUpdate = getConnectorsByViewItem(
      viewItem.value.id,
      view.value.connectors ?? []
    );

    const updatedConnectors = connectorsToUpdate.reduce((acc, connector) => {
      return syncConnector(connector.id, viewId, acc);
    }, draft);

    draft.model.views[view.index].connectors =
      updatedConnectors.model.views[view.index].connectors;

    draft.scene.connectors = updatedConnectors.scene.connectors;
  });

  return newState;
};
