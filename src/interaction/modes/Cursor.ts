import { produce } from 'immer';
import {
  ConnectorAnchor,
  ModeActions,
  ModeActionsAction,
  SceneItemTypeEnum,
  SceneStore,
  Coords
} from 'src/types';
import {
  getItemAtTile,
  hasMovedTile,
  getAnchorAtTile,
  getItemById,
  generateId,
  CoordsUtils
} from 'src/utils';

const getAnchor = (connectorId: string, tile: Coords, scene: SceneStore) => {
  const connector = getItemById(scene.connectors, connectorId).item;
  const anchor = getAnchorAtTile(tile, connector.anchors);

  if (!anchor) {
    const newAnchor: ConnectorAnchor = {
      id: generateId(),
      type: SceneItemTypeEnum.CONNECTOR_ANCHOR,
      ref: { type: 'TILE', coords: tile }
    };

    const newConnector = produce(connector, (draft) => {
      draft.anchors.push(newAnchor);
    });

    scene.actions.updateConnector(connector.id, newConnector);
    return newAnchor;
  }

  return anchor;
};

const mousedown: ModeActionsAction = ({
  uiState,
  scene,
  isRendererInteraction
}) => {
  if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

  const item = getItemAtTile({
    tile: uiState.mouse.position.tile,
    scene
  });

  if (item) {
    uiState.actions.setMode(
      produce(uiState.mode, (draft) => {
        draft.mousedownItem = item;
      })
    );

    uiState.actions.setItemControls(item);
  } else {
    uiState.actions.setMode(
      produce(uiState.mode, (draft) => {
        draft.mousedownItem = null;
      })
    );

    uiState.actions.setItemControls(null);
  }
};

export const Cursor: ModeActions = {
  entry: (state) => {
    const { uiState } = state;

    if (uiState.mode.type !== 'CURSOR') return;

    if (uiState.mode.mousedownItem) {
      mousedown(state);
    }
  },
  mousemove: ({ scene, uiState }) => {
    if (uiState.mode.type !== 'CURSOR' || !hasMovedTile(uiState.mouse)) return;

    let item = uiState.mode.mousedownItem;

    if (item?.type === 'CONNECTOR') {
      const prevTile = uiState.mouse.delta
        ? CoordsUtils.subtract(
            uiState.mouse.position.tile,
            uiState.mouse.delta.tile
          )
        : CoordsUtils.zero();
      const anchor = getAnchor(item.id, prevTile, scene);
      item = anchor;
    }

    if (item) {
      uiState.actions.setMode({
        type: 'DRAG_ITEMS',
        showCursor: true,
        items: [item],
        isInitialMovement: true
      });
    }
  },
  mousedown,
  mouseup: ({ uiState, isRendererInteraction }) => {
    if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

    if (uiState.mode.mousedownItem) {
      if (uiState.mode.mousedownItem.type === 'NODE') {
        uiState.actions.setItemControls({
          type: 'NODE',
          id: uiState.mode.mousedownItem.id
        });
      } else if (uiState.mode.mousedownItem.type === 'RECTANGLE') {
        uiState.actions.setItemControls({
          type: 'RECTANGLE',
          id: uiState.mode.mousedownItem.id
        });

        uiState.actions.setMode({
          type: 'RECTANGLE.TRANSFORM',
          id: uiState.mode.mousedownItem.id,
          showCursor: true,
          selectedAnchor: null
        });

        return;
      } else if (uiState.mode.mousedownItem.type === 'CONNECTOR') {
        uiState.actions.setItemControls({
          type: 'CONNECTOR',
          id: uiState.mode.mousedownItem.id
        });
      } else if (uiState.mode.mousedownItem.type === 'TEXTBOX') {
        uiState.actions.setItemControls({
          type: 'TEXTBOX',
          id: uiState.mode.mousedownItem.id
        });
      }
    } else {
      uiState.actions.setItemControls(null);
    }

    uiState.actions.setMode(
      produce(uiState.mode, (draft) => {
        draft.mousedownItem = null;
      })
    );
  }
};
