import { produce } from 'immer';
import {
  isWithinBounds,
  getItemById,
  getItemAtTile,
  getBoundingBox,
  outermostCornerPositions,
  getTilePosition,
  convertBoundsToNamedAnchors,
  hasMovedTile
} from 'src/utils';
import { TRANSFORM_ANCHOR_SIZE } from 'src/config';
import { ModeActions, AnchorPositionsEnum } from 'src/types';

export const TransformRectangle: ModeActions = {
  entry: () => {},
  exit: () => {},
  mousemove: ({ uiState, scene }) => {
    if (
      uiState.mode.type !== 'RECTANGLE.TRANSFORM' ||
      !hasMovedTile(uiState.mouse)
    )
      return;

    if (uiState.mode.selectedAnchor) {
      // User is dragging an anchor
      const { item: rectangle } = getItemById(
        scene.rectangles,
        uiState.mode.id
      );
      const rectangleBounds = getBoundingBox([rectangle.to, rectangle.from]);
      const namedBounds = convertBoundsToNamedAnchors(rectangleBounds);

      if (
        uiState.mode.selectedAnchor === AnchorPositionsEnum.BOTTOM_LEFT ||
        uiState.mode.selectedAnchor === AnchorPositionsEnum.TOP_RIGHT
      ) {
        const nextBounds = getBoundingBox([
          uiState.mode.selectedAnchor === AnchorPositionsEnum.BOTTOM_LEFT
            ? namedBounds.TOP_RIGHT
            : namedBounds.BOTTOM_LEFT,
          uiState.mouse.position.tile
        ]);
        const nextNamedBounds = convertBoundsToNamedAnchors(nextBounds);

        scene.actions.updateRectangle(uiState.mode.id, {
          from: nextNamedBounds.TOP_RIGHT,
          to: nextNamedBounds.BOTTOM_LEFT
        });
      } else if (
        uiState.mode.selectedAnchor === AnchorPositionsEnum.BOTTOM_RIGHT ||
        uiState.mode.selectedAnchor === AnchorPositionsEnum.TOP_LEFT
      ) {
        const nextBounds = getBoundingBox([
          uiState.mode.selectedAnchor === AnchorPositionsEnum.BOTTOM_RIGHT
            ? namedBounds.TOP_LEFT
            : namedBounds.BOTTOM_RIGHT,
          uiState.mouse.position.tile
        ]);
        const nextNamedBounds = convertBoundsToNamedAnchors(nextBounds);

        scene.actions.updateRectangle(uiState.mode.id, {
          from: nextNamedBounds.TOP_LEFT,
          to: nextNamedBounds.BOTTOM_RIGHT
        });
      }
    }
  },
  mousedown: ({ uiState, scene }) => {
    if (uiState.mode.type !== 'RECTANGLE.TRANSFORM') return;

    const { item: rectangle } = getItemById(scene.rectangles, uiState.mode.id);

    // Check if the user has mousedown'd on an anchor
    const rectangleBounds = getBoundingBox([rectangle.to, rectangle.from]);
    const anchorPositions = rectangleBounds.map((corner, i) => {
      return getTilePosition({
        tile: corner,
        origin: outermostCornerPositions[i]
      });
    });
    const activeAnchorIndex = anchorPositions.findIndex((anchorPosition) => {
      return isWithinBounds(uiState.mouse.position.screen, [
        {
          x: anchorPosition.x - TRANSFORM_ANCHOR_SIZE,
          y: anchorPosition.y - TRANSFORM_ANCHOR_SIZE
        },
        {
          x: anchorPosition.x + TRANSFORM_ANCHOR_SIZE,
          y: anchorPosition.y + TRANSFORM_ANCHOR_SIZE
        }
      ]);
    });

    if (activeAnchorIndex !== -1) {
      const activeAnchor =
        Object.values(AnchorPositionsEnum)[activeAnchorIndex];

      uiState.actions.setMode(
        produce(uiState.mode, (draft) => {
          draft.selectedAnchor = activeAnchor;
        })
      );
      return;
    }

    // Check if the userhas mousedown'd on the rectangle itself
    const isMouseWithinRectangle = isWithinBounds(uiState.mouse.position.tile, [
      rectangle.from,
      rectangle.to
    ]);

    if (isMouseWithinRectangle) {
      uiState.actions.setMode({
        type: 'CURSOR',
        mousedownItem: rectangle,
        showCursor: true
      });

      return;
    }

    const itemAtTile = getItemAtTile({
      tile: uiState.mouse.position.tile,
      scene
    });

    uiState.actions.setMode({
      type: 'CURSOR',
      mousedownItem: itemAtTile,
      showCursor: true
    });
  },
  mouseup: ({ uiState }) => {
    if (uiState.mode.type !== 'RECTANGLE.TRANSFORM') return;

    if (uiState.mode.selectedAnchor) {
      uiState.actions.setMode(
        produce(uiState.mode, (draft) => {
          draft.selectedAnchor = null;
        })
      );
    }
  }
};
