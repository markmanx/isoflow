import { useCallback } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Size, Coords } from 'src/types';
import {
  getBoundingBox,
  getBoundingBoxSize,
  sortByPosition,
  clamp,
  getAnchorTile,
  getAllAnchors,
  getTilePosition,
  CoordsUtils
} from 'src/utils';
import { MAX_ZOOM } from 'src/config';
import { useResizeObserver } from './useResizeObserver';

const BOUNDING_BOX_PADDING = 1;

export const useDiagramUtils = () => {
  const scene = useSceneStore(
    ({ nodes, rectangles, connectors, icons, textBoxes }) => {
      return {
        nodes,
        rectangles,
        connectors,
        icons,
        textBoxes
      };
    }
  );
  const rendererEl = useUiStateStore((state) => {
    return state.rendererEl;
  });
  const { size: rendererSize } = useResizeObserver(rendererEl);
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const getProjectBounds = useCallback((): Coords[] => {
    const items = [
      ...scene.nodes,
      ...scene.connectors,
      ...scene.rectangles,
      ...scene.textBoxes
    ];

    let tiles = items.reduce<Coords[]>((acc, item) => {
      switch (item.type) {
        case 'NODE':
          return [...acc, item.tile];
        case 'CONNECTOR':
          return [
            ...acc,
            ...item.anchors.map((anchor) => {
              return getAnchorTile(
                anchor,
                scene.nodes,
                getAllAnchors(scene.connectors)
              );
            })
          ];
        case 'RECTANGLE':
          return [...acc, item.from, item.to];
        case 'TEXTBOX':
          return [
            ...acc,
            item.tile,
            CoordsUtils.add(item.tile, {
              x: item.size.width,
              y: item.size.height
            })
          ];
        default:
          return acc;
      }
    }, []);

    if (tiles.length === 0) {
      const centerTile = CoordsUtils.zero();
      tiles = [centerTile, centerTile, centerTile, centerTile];
    }

    const corners = getBoundingBox(tiles, {
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
