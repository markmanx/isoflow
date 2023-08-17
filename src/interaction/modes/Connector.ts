import { produce } from 'immer';
import {
  generateId,
  filterNodesByTile,
  connectorInputToConnector,
  connectorToConnectorInput,
  getConnectorPath,
  hasMovedTile,
  setWindowCursor
} from 'src/utils';
import { ModeActions } from 'src/types';

export const Connector: ModeActions = {
  type: 'CONNECTOR',
  entry: () => {
    setWindowCursor('crosshair');
  },
  exit: () => {
    setWindowCursor('default');
  },
  mousemove: ({ uiState, scene }) => {
    if (
      uiState.mode.type !== 'CONNECTOR' ||
      !uiState.mode.connector?.anchors[0] ||
      !hasMovedTile(uiState.mouse)
    )
      return;

    // TODO: Items at tile should take the entire scene in and return just the first item of interest
    // for efficiency
    const itemsAtTile = filterNodesByTile({
      tile: uiState.mouse.position.tile,
      nodes: scene.nodes
    });

    if (itemsAtTile.length > 0) {
      const node = itemsAtTile[0];

      const newMode = produce(uiState.mode, (draftState) => {
        if (!draftState.connector) return;

        draftState.connector.anchors[1] = {
          type: 'NODE',
          id: node.id
        };

        draftState.connector.path = getConnectorPath({
          anchors: draftState.connector.anchors,
          nodes: scene.nodes
        });
      });

      uiState.actions.setMode(newMode);
    } else {
      const newMode = produce(uiState.mode, (draftState) => {
        if (!draftState.connector) return;

        draftState.connector.anchors[1] = {
          type: 'TILE',
          coords: uiState.mouse.position.tile
        };

        draftState.connector.path = getConnectorPath({
          anchors: draftState.connector.anchors,
          nodes: scene.nodes
        });
      });

      uiState.actions.setMode(newMode);
    }
  },
  mousedown: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'CONNECTOR') return;

    const itemsAtTile = filterNodesByTile({
      tile: uiState.mouse.position.tile,
      nodes: scene.nodes
    });

    if (itemsAtTile.length > 0) {
      const node = itemsAtTile[0];

      const newMode = produce(uiState.mode, (draftState) => {
        draftState.connector = connectorInputToConnector(
          {
            id: generateId(),
            anchors: [{ nodeId: node.id }, { nodeId: node.id }]
          },
          scene.nodes
        );
      });

      uiState.actions.setMode(newMode);
    } else {
      const newMode = produce(uiState.mode, (draftState) => {
        draftState.connector = connectorInputToConnector(
          {
            id: generateId(),
            anchors: [
              { tile: uiState.mouse.position.tile },
              { tile: uiState.mouse.position.tile }
            ]
          },
          scene.nodes
        );
      });

      uiState.actions.setMode(newMode);
    }
  },
  mouseup: ({ uiState, scene, isRendererInteraction }) => {
    if (uiState.mode.type !== 'CONNECTOR' || !isRendererInteraction) return;

    if (uiState.mode.connector && uiState.mode.connector.anchors.length >= 2) {
      scene.actions.createConnector(
        connectorToConnectorInput(uiState.mode.connector)
      );
    }

    uiState.actions.setMode({
      type: 'CURSOR',
      showCursor: true,
      mousedown: null
    });
  }
};
