import { useCallback } from 'react';
import { useSceneStore } from 'src/stores/sceneStore';
import { useUiStateStore } from 'src/stores/uiStateStore';
import { Size, Coords, Node, Rectangle, Connector } from 'src/types';
import {
  getBoundingBox,
  getBoundingBoxSize,
  sortByPosition,
  clamp,
  getAnchorTile,
  getAllAnchors,
  getTilePosition
} from 'src/utils';
import { useScroll } from 'src/hooks/useScroll';
import { MAX_ZOOM } from 'src/config';

const BOUNDING_BOX_PADDING = 3;

export const useDiagramUtils = () => {
  const scene = useSceneStore(({ nodes, rectangles, connectors, icons }) => {
    return {
      nodes,
      rectangles,
      connectors,
      icons
    };
  });
  const { scrollToTile } = useScroll();
  const rendererSize = useUiStateStore((state) => {
    return state.rendererSize;
  });
  const uiStateActions = useUiStateStore((state) => {
    return state.actions;
  });

  const getProjectBounds = useCallback(
    (items: (Node | Rectangle | Connector)[]): Coords[] => {
      const positions = items.reduce<Coords[]>((acc, item) => {
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
          default:
            return acc;
        }
      }, []);

      const corners = getBoundingBox(positions, {
        x: BOUNDING_BOX_PADDING,
        y: BOUNDING_BOX_PADDING
      });

      return corners;
    },
    [scene.nodes, scene.connectors]
  );

  const getUnprojectedBounds = useCallback((): Size & Coords => {
    const projectBounds = getProjectBounds([
      ...scene.nodes,
      ...scene.connectors,
      ...scene.rectangles
    ]);

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
  }, [scene, getProjectBounds]);

  const fitProjectToScreen = useCallback(() => {
    const boundingBox = getProjectBounds(scene.nodes);
    const sortedCornerPositions = sortByPosition(boundingBox);
    const boundingBoxSize = getBoundingBoxSize(boundingBox);
    const centralTile: Coords = {
      x: sortedCornerPositions.lowX + Math.floor(boundingBoxSize.width / 2),
      y: sortedCornerPositions.lowY + Math.floor(boundingBoxSize.height / 2)
    };

    const unprojectedBounds = getUnprojectedBounds();
    const newZoom = Math.min(
      rendererSize.width / unprojectedBounds.width,
      rendererSize.height / unprojectedBounds.height
    );

    uiStateActions.setZoom(clamp(newZoom, 0, MAX_ZOOM));
    scrollToTile(centralTile);
  }, [
    getProjectBounds,
    scene,
    scrollToTile,
    rendererSize,
    uiStateActions,
    getUnprojectedBounds
  ]);

  return {
    getUnprojectedBounds,
    fitProjectToScreen
  };
};
