import { v4 as uuid } from 'uuid';
import { InteractionReducer } from 'src/types';
import {
  filterNodesByTile,
  connectorInputToConnector,
  getConnectorPath
} from 'src/utils';

export const Connector: InteractionReducer = {
  type: 'CONNECTOR',
  mousemove: (draftState) => {
    if (
      draftState.mode.type !== 'CONNECTOR' ||
      !draftState.mode.connector?.anchors[0]
    )
      return;

    const itemsAtTile = filterNodesByTile({
      tile: draftState.mouse.position.tile,
      nodes: draftState.scene.nodes
    });

    if (itemsAtTile.length > 0) {
      const node = itemsAtTile[0];

      draftState.mode.connector.anchors[1] = {
        type: 'NODE',
        id: node.id
      };
    } else {
      draftState.mode.connector.anchors[1] = {
        type: 'TILE',
        coords: draftState.mouse.position.tile
      };
    }

    draftState.mode.connector.path = getConnectorPath({
      anchors: draftState.mode.connector.anchors,
      nodes: draftState.scene.nodes
    });
  },
  mousedown: (draftState) => {
    if (draftState.mode.type !== 'CONNECTOR') return;

    const itemsAtTile = filterNodesByTile({
      tile: draftState.mouse.position.tile,
      nodes: draftState.scene.nodes
    });

    if (itemsAtTile.length > 0) {
      const node = itemsAtTile[0];

      draftState.mode.connector = connectorInputToConnector(
        {
          id: uuid(),
          anchors: [{ nodeId: node.id }, { nodeId: node.id }]
        },
        draftState.scene.nodes
      );

      return;
    }

    draftState.mode.connector = connectorInputToConnector(
      {
        id: uuid(),
        anchors: [
          { tile: draftState.mouse.position.tile },
          { tile: draftState.mouse.position.tile }
        ]
      },
      draftState.scene.nodes
    );
  },
  mouseup: (draftState) => {
    if (draftState.mode.type !== 'CONNECTOR') return;

    if (
      draftState.mode.connector &&
      draftState.mode.connector.anchors.length >= 2
    ) {
      draftState.scene.connectors.push(draftState.mode.connector);
    }

    draftState.mode.connector = null;
  }
};
