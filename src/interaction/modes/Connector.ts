import { produce } from 'immer';
import {
  generateId,
  getItemAtTile,
  connectorInputToConnector,
  connectorToConnectorInput,
  getConnectorPath,
  hasMovedTile,
  setWindowCursor,
  getAllAnchors
} from 'src/utils';
import { ModeActions } from 'src/types';

export const Connector: ModeActions = {
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
    const itemAtTile = getItemAtTile({
      tile: uiState.mouse.position.tile,
      scene
    });

    if (itemAtTile && itemAtTile.type === 'NODE') {
      const newMode = produce(uiState.mode, (draftState) => {
        if (!draftState.connector) return;

        draftState.connector.anchors[1] = {
          ref: {
            type: 'NODE',
            id: itemAtTile.id
          }
        };

        draftState.connector.path = getConnectorPath({
          anchors: draftState.connector.anchors,
          nodes: scene.nodes,
          allAnchors: getAllAnchors(scene.connectors)
        });
      });

      uiState.actions.setMode(newMode);
    } else {
      const newMode = produce(uiState.mode, (draftState) => {
        if (!draftState.connector) return;

        draftState.connector.anchors[1] = {
          ref: {
            type: 'TILE',
            coords: uiState.mouse.position.tile
          }
        };

        draftState.connector.path = getConnectorPath({
          anchors: draftState.connector.anchors,
          nodes: scene.nodes,
          allAnchors: getAllAnchors(scene.connectors)
        });
      });

      uiState.actions.setMode(newMode);
    }
  },
  mousedown: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'CONNECTOR') return;

    const itemAtTile = getItemAtTile({
      tile: uiState.mouse.position.tile,
      scene
    });

    if (itemAtTile && itemAtTile.type === 'NODE') {
      const newMode = produce(uiState.mode, (draftState) => {
        draftState.connector = connectorInputToConnector(
          {
            id: generateId(),
            anchors: [
              { ref: { node: itemAtTile.id } },
              { ref: { node: itemAtTile.id } }
            ]
          },
          scene.nodes,
          getAllAnchors(scene.connectors)
        );
      });

      uiState.actions.setMode(newMode);
    } else {
      const newMode = produce(uiState.mode, (draftState) => {
        draftState.connector = connectorInputToConnector(
          {
            id: generateId(),
            anchors: [
              { ref: { tile: uiState.mouse.position.tile } },
              { ref: { tile: uiState.mouse.position.tile } }
            ]
          },
          scene.nodes,
          getAllAnchors(scene.connectors)
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
      mousedownItem: null
    });
  }
};
