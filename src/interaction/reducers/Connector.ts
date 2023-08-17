import { produce } from 'immer';
import {
  generateId,
  filterNodesByTile,
  connectorInputToConnector,
  connectorToConnectorInput,
  getConnectorPath,
  hasMovedTile
} from 'src/utils';
import { InteractionReducer } from 'src/types';

export const Connector: InteractionReducer = {
  type: 'CONNECTOR',
  mousemove: (state) => {
    if (
      state.mode.type !== 'CONNECTOR' ||
      !state.mode.connector?.anchors[0] ||
      !hasMovedTile(state.mouse)
    )
      return;

    // TODO: Items at tile should take the entire scene in and return just the first item of interest
    // for efficiency
    const itemsAtTile = filterNodesByTile({
      tile: state.mouse.position.tile,
      nodes: state.scene.nodes
    });

    if (itemsAtTile.length > 0) {
      const node = itemsAtTile[0];

      const newMode = produce(state.mode, (draftState) => {
        if (!draftState.connector) return;

        draftState.connector.anchors[1] = {
          type: 'NODE',
          id: node.id
        };

        draftState.connector.path = getConnectorPath({
          anchors: draftState.connector.anchors,
          nodes: state.scene.nodes
        });
      });

      state.uiStateActions.setMode(newMode);
    } else {
      const newMode = produce(state.mode, (draftState) => {
        if (!draftState.connector) return;

        draftState.connector.anchors[1] = {
          type: 'TILE',
          coords: state.mouse.position.tile
        };

        draftState.connector.path = getConnectorPath({
          anchors: draftState.connector.anchors,
          nodes: state.scene.nodes
        });
      });

      state.uiStateActions.setMode(newMode);
    }
  },
  mousedown: (state) => {
    if (state.mode.type !== 'CONNECTOR') return;

    const itemsAtTile = filterNodesByTile({
      tile: state.mouse.position.tile,
      nodes: state.scene.nodes
    });

    if (itemsAtTile.length > 0) {
      const node = itemsAtTile[0];

      const newMode = produce(state.mode, (draftState) => {
        draftState.connector = connectorInputToConnector(
          {
            id: generateId(),
            anchors: [{ nodeId: node.id }, { nodeId: node.id }]
          },
          state.scene.nodes
        );
      });

      state.uiStateActions.setMode(newMode);
    } else {
      const newMode = produce(state.mode, (draftState) => {
        draftState.connector = connectorInputToConnector(
          {
            id: generateId(),
            anchors: [
              { tile: state.mouse.position.tile },
              { tile: state.mouse.position.tile }
            ]
          },
          state.scene.nodes
        );
      });

      state.uiStateActions.setMode(newMode);
    }
  },
  mouseup: (state) => {
    if (state.mode.type !== 'CONNECTOR') return;

    if (state.mode.connector && state.mode.connector.anchors.length >= 2) {
      state.sceneActions.createConnector(
        connectorToConnectorInput(state.mode.connector)
      );
    }

    const newMode = produce(state.mode, (draftState) => {
      draftState.connector = null;
    });

    state.uiStateActions.setMode(newMode);
  }
};
