import { SidebarTypeEnum } from 'src/stores/useUiStateStore';
import { Coords } from 'src/utils/Coords';
import { InteractionReducer } from '../types';
import { getItemsByTile } from '../../renderer/utils/gridHelpers';

export const Cursor: InteractionReducer = {
  mousemove: (draftState) => {
    if (draftState.mode.type !== 'CURSOR') return;

    if (
      draftState.mouse.delta === null ||
      !draftState.mouse.delta.tile.isEqual(Coords.fromObject({ x: 0, y: 0 }))
    ) {
      // User has moved tile since the last mousedown event
      if (
        draftState.mode.mousedownItems &&
        draftState.mode.mousedownItems.nodes.length > 0
      ) {
        // User's last mousedown action was on a scene item
        draftState.mode = {
          type: 'DRAG_ITEMS',
          items: draftState.mode.mousedownItems
        };
      }

      // WIP: Lasso selection
      // if (draftState.mode.mousedownItems?.nodes.length === 0) {
      //   // User's last mousedown action was on an empty tile
      //   draftState.mode = {
      //     type: 'LASSO',
      //     selection: {
      //       startTile: draftState.mouse.position.tile,
      //       endTile: draftState.mouse.position.tile
      //     },
      //     isDragging: false
      //   };
      // }
    }
  },
  mousedown: (draftState) => {
    if (draftState.mode.type !== 'CURSOR') return;

    const itemsAtTile = getItemsByTile({
      tile: draftState.mouse.position.tile,
      sortedSceneItems: draftState.scene
    });

    draftState.mode.mousedownItems = itemsAtTile;
  },
  mouseup: (draftState) => {
    if (draftState.mode.type !== 'CURSOR') return;

    draftState.scene.nodes = draftState.scene.nodes.map((node) => ({
      ...node,
      isSelected: false
    }));

    if (draftState.mode.mousedownItems !== null) {
      // User's last mousedown action was on a scene item
      const mousedownNode = draftState.mode.mousedownItems.nodes[0];

      if (mousedownNode) {
        // The user's last mousedown action was on a node
        const nodeIndex = draftState.scene.nodes.findIndex(
          (node) => node.id === mousedownNode.id
        );

        if (nodeIndex === -1) return;

        draftState.contextMenu = draftState.scene.nodes[nodeIndex];
        draftState.scene.nodes[nodeIndex].isSelected = true;
        draftState.itemControls = {
          type: SidebarTypeEnum.SINGLE_NODE,
          nodeId: draftState.scene.nodes[nodeIndex].id
        };
        draftState.mode.mousedownItems = null;

        return;
      }

      // Empty tile selected
      draftState.contextMenu = {
        type: 'EMPTY_TILE',
        position: draftState.mouse.position.tile
      };
      draftState.itemControls = null;
      draftState.mode.mousedownItems = null;
    }
  }
};
