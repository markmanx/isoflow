import { useCallback } from 'react';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Size, Coords } from 'src/types';
import {
  getBoundingBox,
  getBoundingBoxSize,
  sortByPosition,
  clamp,
  getTilePosition,
  CoordsUtils
} from 'src/utils';
import { MAX_ZOOM } from 'src/config';
import { useScene } from 'src/hooks/useScene';
import { useResizeObserver } from './useResizeObserver';

const BOUNDING_BOX_PADDING = 3;

export const useDiagramUtils = () => {
  const scene = useScene();
  const rendererEl = useUiStateStore((state) => {
    return state.rendererEl;
  });
  const { size: rendererSize } = useResizeObserver(rendererEl);
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const getProjectBounds = useCallback((): Coords[] => {
    const itemTiles = scene.items.map((item) => {
      return item.tile;
    });

    const connectorTiles = scene.connectors.reduce<Coords[]>(
      (acc, connector) => {
        return [...acc, ...connector.path.tiles];
      },
      []
    );

    const rectangleTiles = scene.rectangles.reduce<Coords[]>(
      (acc, rectangle) => {
        return [...acc, rectangle.from, rectangle.to];
      },
      []
    );

    const textBoxTiles = scene.textBoxes.reduce<Coords[]>((acc, textBox) => {
      return [
        ...acc,
        textBox.tile,
        CoordsUtils.add(textBox.tile, {
          x: textBox.size.width,
          y: textBox.size.height
        })
      ];
    }, []);

    let allTiles = [
      ...itemTiles,
      ...connectorTiles,
      ...rectangleTiles,
      ...textBoxTiles
    ];

    if (allTiles.length === 0) {
      const centerTile = CoordsUtils.zero();
      allTiles = [centerTile, centerTile, centerTile, centerTile];
    }

    const corners = getBoundingBox(allTiles, {
      x: BOUNDING_BOX_PADDING,
      y: BOUNDING_BOX_PADDING
    });

    return corners;
  }, [scene]);

  const getUnprojectedBounds = useCallback((): Size & Coords => {
    const projectBounds = getProjectBounds();

    const cornerPositions = projectBounds.map((corner) => {
      return getTilePosition({
        tile: corner
      });
    });
    const sortedCorners = sortByPosition(cornerPositions);
    const topLeft = { x: sortedCorners.lowX, y: sortedCorners.lowY };
    const size = getBoundingBoxSize(cornerPositions);

    return {
      width: size.width,
      height: size.height,
      x: topLeft.x,
      y: topLeft.y
    };
  }, [getProjectBounds]);

  const getFitToViewParams = useCallback(
    (viewportSize: Size) => {
      const projectBounds = getProjectBounds();
      const sortedCornerPositions = sortByPosition(projectBounds);
      const boundingBoxSize = getBoundingBoxSize(projectBounds);
      const unprojectedBounds = getUnprojectedBounds();
      const newZoom = clamp(
        Math.min(
          viewportSize.width / unprojectedBounds.width,
          viewportSize.height / unprojectedBounds.height
        ),
        0,
        MAX_ZOOM
      );
      const scrollTarget: Coords = {
        x: (sortedCornerPositions.lowX + boundingBoxSize.width / 2) * newZoom,
        y: (sortedCornerPositions.lowY + boundingBoxSize.height / 2) * newZoom
      };

      return {
        zoom: newZoom,
        scrollTarget
      };
    },
    [getProjectBounds, getUnprojectedBounds]
  );

  const fitToView = useCallback(async () => {
    const { zoom, scrollTarget } = getFitToViewParams(rendererSize);

    uiStateActions.scrollToTile(scrollTarget);
    uiStateActions.setZoom(zoom);
  }, [uiStateActions, getFitToViewParams, rendererSize]);

  return {
    getUnprojectedBounds,
    fitToView,
    getFitToViewParams
  };
};
