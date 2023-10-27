import { Connector } from 'src/types';
import { produce } from 'immer';
import { getItemByIdOrThrow, getConnectorPath, getAllAnchors } from 'src/utils';
import { validateConnector } from 'src/validation/utils';
import { State } from './types';

export const deleteConnector = (
  id: string,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);
  const connector = getItemByIdOrThrow(view.value.connectors ?? [], id);

  const newState = produce(state, (draft) => {
    draft.model.views[view.index].connectors?.splice(connector.index, 1);
    delete draft.scene.connectors[connector.index];
  });

  return newState;
};

export const syncConnector = (id: string, viewId: string, state: State) => {
  const newState = produce(state, (draft) => {
    const view = getItemByIdOrThrow(draft.model.views, viewId);
    const connector = getItemByIdOrThrow(view.value.connectors ?? [], id);
    const allAnchors = getAllAnchors(view.value.connectors ?? []);
    const issues = validateConnector(connector.value, {
      view: view.value,
      allAnchors
    });

    if (issues.length > 0) {
      const stateAfterDelete = deleteConnector(id, viewId, draft);
      draft.scene = stateAfterDelete.scene;
      draft.model = stateAfterDelete.model;
    } else {
      const path = getConnectorPath({
        anchors: connector.value.anchors,
        view: view.value
      });

      draft.scene.connectors[connector.value.id] = { path };
    }
  });

  return newState;
};

export const updateConnector = (
  id: string,
  updates: Partial<Connector>,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);

  const newState = produce(state, (draft) => {
    const { connectors } = draft.model.views[view.index];

    if (!connectors) return;

    const connector = getItemByIdOrThrow(connectors, id);
    const newConnector = { ...connector.value, ...updates };
    connectors[connector.index] = newConnector;

    if (updates.anchors) {
      const stateAfterSync = syncConnector(id, viewId, draft);
      draft.scene = stateAfterSync.scene;
      draft.model = stateAfterSync.model;
    }
  });

  return newState;
};

export const createConnector = (
  newConnector: Connector,
  viewId: string,
  state: State
): State => {
  const view = getItemByIdOrThrow(state.model.views, viewId);

  const newState = produce(state, (draft) => {
    const { connectors } = draft.model.views[view.index];

    if (!connectors) {
      draft.model.views[view.index].connectors = [newConnector];
    } else {
      draft.model.views[view.index].connectors?.push(newConnector);
    }
  });

  return syncConnector(newConnector.id, viewId, newState);
};
