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
import { ModeActions, SceneItemTypeEnum } from 'src/types';

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
      const newMode = produce(uiState.mode, (draft) => {
        if (!draft.connector) return;

        draft.connector.anchors[1] = {
          id: generateId(),
          type: SceneItemTypeEnum.CONNECTOR_ANCHOR,
          ref: {
            type: 'NODE',
            id: itemAtTile.id
          }
        };
      });

      uiState.actions.setMode(newMode);
    } else {
      const newMode = produce(uiState.mode, (draft) => {
        if (!draft.connector) return;

        draft.connector.anchors[1] = {
          id: generateId(),
          type: SceneItemTypeEnum.CONNECTOR_ANCHOR,
          ref: {
            type: 'TILE',
            coords: uiState.mouse.position.tile
          }
        };

        draft.connector.path = getConnectorPath({
          anchors: draft.connector.anchors,
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
      const newMode = produce(uiState.mode, (draft) => {
        draft.connector = connectorInputToConnector(
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
      const newMode = produce(uiState.mode, (draft) => {
        draft.connector = connectorInputToConnector(
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
