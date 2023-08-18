import { produce } from 'immer';
import { ItemControlsTypeEnum, ModeActions } from 'src/types';
import { getItemAtTile, getItemById, hasMovedTile } from 'src/utils';

export const Cursor: ModeActions = {
  mousemove: ({ uiState }) => {
    if (uiState.mode.type !== 'CURSOR' || !hasMovedTile(uiState.mouse)) return;

    if (uiState.mode.mousedownItem) {
      // User is in dragging mode
      uiState.actions.setMode({
        type: 'DRAG_ITEMS',
        showCursor: true,
        items: [uiState.mode.mousedownItem]
      });

      // draftState.mode = {
      //   type: 'LASSO',
      //   showCursor: false,
      //   selection: {
      //     startTile: draftState.mode.mousedown.tile,
      //     endTile: draftState.mouse.position.tile,
      //     items: []
      //   },
      //   isDragging: false
      // };
    }
  },
  mousedown: ({ uiState, scene, isRendererInteraction }) => {
    if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

    const itemAtTile = getItemAtTile({
      tile: uiState.mouse.position.tile,
      scene
    });

    const newMode = produce(uiState.mode, (draftState) => {
      draftState.mousedownItem = itemAtTile;
    });

    uiState.actions.setMode(newMode);
  },
  mouseup: ({ uiState, scene, isRendererInteraction }) => {
    if (uiState.mode.type !== 'CURSOR' || !isRendererInteraction) return;

    if (
      uiState.mode.mousedownItem &&
      uiState.mode.mousedownItem.type === 'NODE'
    ) {
      const { item: node } = getItemById(
        scene.nodes,
        uiState.mode.mousedownItem.id
      );

      uiState.actions.setContextMenu(node);
      uiState.actions.setItemControls({
        type: ItemControlsTypeEnum.SINGLE_NODE,
        nodeId: node.id
      });
    } else {
      // Empty tile selected
      uiState.actions.setContextMenu({
        type: 'EMPTY_TILE',
        position: uiState.mouse.position.tile
      });

      uiState.actions.setItemControls(null);
    }

    const newMode = produce(uiState.mode, (draftState) => {
      draftState.mousedownItem = null;
    });

    uiState.actions.setMode(newMode);
  }
};
