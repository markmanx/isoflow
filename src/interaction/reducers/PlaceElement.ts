import { produce } from 'immer';
import { InteractionReducer } from 'src/types';
import { filterNodesByTile, generateId } from 'src/utils';

export const PlaceElement: InteractionReducer = {
  type: 'PLACE_ELEMENT',
  mousemove: () => {},
  mousedown: (state) => {
    if (state.mode.type !== 'PLACE_ELEMENT') return;

    if (!state.mode.icon) {
      const itemsAtTile = filterNodesByTile({
        tile: state.mouse.position.tile,
        nodes: state.scene.nodes
      });

      state.uiStateActions.setMode({
        type: 'CURSOR',
        mousedown: {
          items: itemsAtTile,
          tile: state.mouse.position.tile
        },
        showCursor: true
      });

      state.uiStateActions.setItemControls(null);
    }
  },
  mouseup: (state) => {
    if (state.mode.type !== 'PLACE_ELEMENT') return;

    if (state.mode.icon !== null) {
      state.sceneActions.createNode({
        id: generateId(),
        iconId: state.mode.icon.id,
        label: 'New Node',
        position: state.mouse.position.tile
      });

      const newMode = produce(state.mode, (draftState) => {
        draftState.icon = null;
      });

      state.uiStateActions.setMode(newMode);
    }
  }
};
